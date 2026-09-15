import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSecondsToDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = seconds % 60;

  return `${hours > 0 ? `${hours} س ` : ""} ${minutes > 0 ? `${minutes} د ` : ""} ${secondsRemaining > 0 ? `${secondsRemaining} ث` : ""}`;

  // switch (true) {
  //   case hours > 0:
  //     return `${hours} س ${minutes} د ${secondsRemaining} ث`;

  //   case minutes > 0:
  //     return `${minutes} د ${secondsRemaining} ث`;

  //   case seconds > 0:
  //     return `${seconds} ث`;

  //   default:
  //     return "0 ث";
  // }
};
