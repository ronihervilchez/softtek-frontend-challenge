interface AppConfiguration {
  readonly ENCRYPTED_KEY: string;
  readonly BACKEND_API: string;
  readonly APP_NAME: string;
}

interface ApiEndpoints {
  loginUrl(): string;
  signupUrl(): string;
  personajesUrl(): string;
  historialUrl(): string;
  actualizarPerfilUrl(): string;
  obtenerPerfilUrl(): string;
}

class AppConfig {
  static get ENCRYPTED_KEY(): string {
    return process.env.ENCRYPTED_KEY ?? "default-encrypted-key";
  }

  static get BACKEND_API(): string {
    return process.env.BACKEND_API ?? "http://localhost:3000/api";
  }

  static get APP_NAME(): string {
    return "Softtek Challenge";
  }

  // URLs de endpoints API
  static loginUrl(): string {
    return `${this.BACKEND_API}/login`;
  }

  static signupUrl(): string {
    return `${this.BACKEND_API}/registro`;
  }

  static personajesUrl(): string {
    return `${this.BACKEND_API}/fusionados`;
  }

  static historialUrl(): string {
    return `${this.BACKEND_API}/historial`;
  }

  static actualizarPerfilUrl(): string {
    return `${this.BACKEND_API}/almacenar`;
  }

  static obtenerPerfilUrl(): string {
    return `${this.BACKEND_API}/perfil`; //sin implementar
  }
}

export default AppConfig;
export type { AppConfiguration, ApiEndpoints };
