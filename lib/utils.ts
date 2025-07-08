import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    const valueEncripted = CryptoJS.AES.encrypt(value, "estercleromastoideo").toString();
    localStorage.setItem(key, valueEncripted);
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const encriptedValue = localStorage.getItem(key);
    const decriptedValue = encriptedValue
      ? CryptoJS.AES.decrypt(encriptedValue, "estercleromastoideo").toString(CryptoJS.enc.Utf8)
      : null;
    return decriptedValue;
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
