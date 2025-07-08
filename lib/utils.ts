import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";
import AppConfig from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    try {
      const valueEncripted = CryptoJS.AES.encrypt(value, AppConfig.ENCRYPTED_KEY).toString();
      localStorage.setItem(key, valueEncripted);
    } catch (error) {
      console.error("Error al encriptar:", error);
      // Fallback: guardar sin encriptar
      localStorage.setItem(key, value);
    }
  }
}

export function getLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    try {
      const encriptedValue = localStorage.getItem(key);
      if (!encriptedValue) {
        return null;
      }

      // Intentar desencriptar
      const decriptedBytes = CryptoJS.AES.decrypt(encriptedValue, AppConfig.ENCRYPTED_KEY);
      const decriptedValue = decriptedBytes.toString(CryptoJS.enc.Utf8);

      // Verificar si la desencriptación fue exitosa
      if (!decriptedValue) {
        console.warn("No se pudo desencriptar el valor, posible dato corrupto");
        // Limpiar el valor corrupto
        localStorage.removeItem(key);
        return null;
      }

      return decriptedValue;
    } catch (error) {
      console.error("Error al desencriptar:", error);
      // Limpiar el valor corrupto y devolver null
      localStorage.removeItem(key);
      return null;
    }
  }
  return null;
}

export function removeLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

// Función auxiliar para limpiar todos los datos corruptos
export function clearCorruptedLocalStorage() {
  if (typeof window !== "undefined") {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          // Intentar desencriptar para verificar si está corrupto
          CryptoJS.AES.decrypt(value, AppConfig.ENCRYPTED_KEY).toString(CryptoJS.enc.Utf8);
        }
      } catch (error) {
        console.warn(`Removiendo dato corrupto: ${key}`);
        localStorage.removeItem(key);
      }
    });
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      const authData = getLocalStorage("auth");
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.data?.token ?? null;
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      removeLocalStorage("auth");
    }
  }
  return null;
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}
