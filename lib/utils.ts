import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";
import AppConfig from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setSessionStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    try {
      const valueEncripted = CryptoJS.AES.encrypt(value, AppConfig.ENCRYPTED_KEY).toString();
      sessionStorage.setItem(key, valueEncripted);
    } catch (error) {
      console.error("Error al encriptar:", error);
      // Fallback: guardar sin encriptar
      sessionStorage.setItem(key, value);
    }
  }
}

export function getSessionStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    try {
      const encriptedValue = sessionStorage.getItem(key);
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
        sessionStorage.removeItem(key);
        return null;
      }

      return decriptedValue;
    } catch (error) {
      console.error("Error al desencriptar:", error);
      // Limpiar el valor corrupto y devolver null
      sessionStorage.removeItem(key);
      return null;
    }
  }
  return null;
}

export function removeSessionStorage(key: string) {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
}

// Función auxiliar para limpiar todos los datos corruptos
export function clearCorruptedSessionStorage() {
  if (typeof window !== "undefined") {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      try {
        const value = sessionStorage.getItem(key);
        if (value) {
          // Intentar desencriptar para verificar si está corrupto
          CryptoJS.AES.decrypt(value, AppConfig.ENCRYPTED_KEY).toString(CryptoJS.enc.Utf8);
        }
      } catch (error) {
        console.warn(`Removiendo dato corrupto: ${key}`);
        sessionStorage.removeItem(key);
      }
    });
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      const authData = getSessionStorage("auth");
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.data?.token ?? null;
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      removeSessionStorage("auth");
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
