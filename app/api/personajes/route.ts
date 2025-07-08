import AppConfig from "@/lib/config";
import mockData from "@/mocks/fusionados-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 });
    }

    // Hacer la llamada al backend usando AppConfig
    const response = await axios.get(AppConfig.personajesUrl(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Usar el header completo "Bearer token"
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching personajes:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    // En caso de error, devolver el mock como fallback
    return NextResponse.json(mockData);
  }
}

export async function POST(request: Request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 });
    }

    const body = await request.json();

    const response = await axios.post(AppConfig.personajesUrl(), body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Personaje fusionado exitosamente",
    });
  } catch (error: any) {
    console.error("Error creating personaje:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    if (error.response) {
      return NextResponse.json(
        {
          error: error.response.data?.message ?? "Error al fusionar personaje",
          success: false,
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        error: "Error de conexión con el servidor",
        success: false,
      },
      { status: 500 }
    );
  }
}
