export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginData {
  usuario: Usuario;
  mensaje: string;
  loginInfo: LoginInfo;
}

export interface LoginInfo {
  email: string;
  message: string;
}

export interface Usuario {
  usuario: string;
  fechaCreacion: Date;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  telefono: string;
}
