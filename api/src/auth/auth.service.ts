/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Response } from 'express';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dtos/register.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { LoginDto } from './dtos/login.dto.js';
import type { Request } from 'express';
import { JWTPayload } from './types/JwtUser.type.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto, res: Response) {
    // Check if the user already exists
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = (await bcrypt.hash(dto.password, 10)) as string;

    // Create a new user in the database & refresh token in transaction
    const { user, accessToken, refreshToken } = await this.prisma.$transaction(
      async (prisma) => {
        const user = await prisma.user.create({
          data: {
            email: dto.email,
            fullName: dto.fullName,
            password: hashedPassword,
          },
        });

        const { hashedRefreshToken, accessToken, refreshToken } =
          this.generateTokens(user.id, user.role);

        await prisma.refreshToken.create({
          data: {
            tokenHash: hashedRefreshToken,
            userId: user.id,
          },
        });

        return { user, accessToken, refreshToken };
      },
    );

    // set cookie with refresh token
    this.setRefreshTokenCookie(res, refreshToken);

    // set cookie with access token
    this.setAccessTokenCookie(res, accessToken);

    return new ApiResponse(true, 'User registered successfully', {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  }

  async login(dto: LoginDto, res: Response) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: { avatar: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, hashedRefreshToken, refreshToken } =
      this.generateTokens(user.id, user.role);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: hashedRefreshToken,
        userId: user.id,
      },
    });

    // Set cookie with refresh token
    this.setRefreshTokenCookie(res, refreshToken);
    // Set cookie with access token
    this.setAccessTokenCookie(res, accessToken);

    return new ApiResponse(true, 'Login successful', {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar?.url,
      },
    });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    // Check if the refresh token exists
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // Verify the refresh token
    let payload: JWTPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: payload.sub,
      },
    });

    const refreshTokenRecord = await Promise.any(
      refreshTokens.map(async (token) => {
        const isValid = await bcrypt.compare(refreshToken, token.tokenHash);

        if (!isValid) {
          throw new Error();
        }

        return token;
      }),
    ).catch(() => null);

    if (!refreshTokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Get the user from the database
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const accessToken = this.generateAccessToken(user.id, user.role);

    // Set cookie with access token
    this.setAccessTokenCookie(res, accessToken);

    return new ApiResponse(true, 'Token refreshed successfully', { user });
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      let payload: JWTPayload;

      try {
        payload = await this.jwtService.verifyAsync(refreshToken);
      } catch {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return new ApiResponse(true, 'Logged out successfully');
      }

      const refreshTokens = await this.prisma.refreshToken.findMany({
        where: {
          userId: payload.sub,
        },
      });

      for (const token of refreshTokens) {
        const isValid = await bcrypt.compare(refreshToken, token.tokenHash);

        if (isValid) {
          await this.prisma.refreshToken.delete({
            where: {
              id: token.id,
            },
          });

          break;
        }
      }
    }

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return new ApiResponse(true, 'Logged out successfully');
  }

  ////////// Helpers ///////////
  // set refresh token in cookie
  setRefreshTokenCookie(res: Response, hashedRefreshToken: string) {
    res.cookie('refreshToken', hashedRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  }

  // generate tokens
  generateTokens(
    userId: string,
    role: string,
  ): {
    accessToken: string;
    hashedRefreshToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '7d' },
    );
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10) as string;

    // const decoded = this.jwtService.decode(accessToken);
    // console.log('TYPE:', typeof decoded);
    // console.log('JSON:', JSON.stringify(decoded));
    // console.log('RAW:', decoded);

    return { accessToken, hashedRefreshToken, refreshToken };
  }

  generateAccessToken(userId: string, role: string): string {
    const accessToken = this.jwtService.sign(
      { sub: userId, role },
      { expiresIn: '15m' },
    );
    return accessToken;
  }
}
