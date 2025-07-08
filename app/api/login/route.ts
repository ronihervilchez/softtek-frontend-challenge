import { NextResponse } from "next/server";
import axios from "axios";
import AppConfig from "@/lib/config";
import { ILogin } from "../../../interfaces/login.interface";

export async function POST(request: Request) {
  try {
    const datos: ILogin = await request.json();

    // Hacer la llamada al backend usando AppConfig
    const response = await axios.post(AppConfig.loginUrl(), datos, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Si el login es exitoso, devolver los datos
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error en login:", error);

    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error del backend (401, 404, etc.)
      return NextResponse.json(
        {
          error: error.response.data?.message ?? "Credenciales inválidas",
          success: false,
        },
        { status: error.response.status }
      );
    }

    // Error de conexión o timeout
    return NextResponse.json(
      {
        error: "Error de conexión con el servidor",
        success: false,
      },
      { status: 500 }
    );
  }
}
