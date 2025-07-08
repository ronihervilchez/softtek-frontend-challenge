import { NextResponse } from "next/server";
import axios from "axios";
import AppConfig from "@/lib/config";
import { ISignIn } from "../../../interfaces/signin.interface";

export async function POST(request: Request) {
  try {
    const datos: ISignIn = await request.json();

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    // Hacer la llamada al backend usando AppConfig
    const response = await axios.post(AppConfig.signupUrl(), datos, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Si el registro es exitoso, devolver los datos
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error en signin:", error);

    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error del backend (409 usuario existe, 400 datos inválidos, etc.)
      return NextResponse.json(
        {
          error: error.response.data?.message ?? "Error al registrar usuario",
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
