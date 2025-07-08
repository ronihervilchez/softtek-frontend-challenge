import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";
import AppConfig from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    const valueEncripted = CryptoJS.AES.encrypt(value, AppConfig.ENCRYPTED_KEY).toString();
    localStorage.setItem(key, valueEncripted);
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const encriptedValue = localStorage.getItem(key);
    const decriptedValue = encriptedValue
      ? CryptoJS.AES.decrypt(encriptedValue, AppConfig.ENCRYPTED_KEY).toString(CryptoJS.enc.Utf8)
      : null;
    return decriptedValue;
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
