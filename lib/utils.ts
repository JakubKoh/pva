import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MenuItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedName(item: MenuItem, language: string): string {
  return language === "en" && item.nameEn ? item.nameEn : item.name;
}

export function getLocalizedDescription(item: MenuItem, language: string): string {
  return language === "en" && item.descriptionEn ? item.descriptionEn : item.description;
}
