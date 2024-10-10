import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatViews = (views: number): string => {
  if (views < 1000) {
      return views.toString();
  } else if (views < 1000000) {
      const formatted = (views / 1000).toFixed(1);
      return formatted.endsWith('.0') ? formatted.slice(0, -2) + ' k' : formatted + ' k';
  } else {
      const formatted = (views / 1000000).toFixed(1);
      return formatted.endsWith('.0') ? formatted.slice(0, -2) + ' M' : formatted + ' M';
  }
};
