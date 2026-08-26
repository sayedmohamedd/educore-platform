import { Test, TestingModule } from '@nestjs/testing';
import { InstructorHelperService } from './instructor-helper.service';

describe('InstructorHelperService', () => {
  let service: InstructorHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstructorHelperService],
    }).compile();

    service = module.get<InstructorHelperService>(InstructorHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
