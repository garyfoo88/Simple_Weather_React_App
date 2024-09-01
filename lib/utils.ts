import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClassnames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  return `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
}
