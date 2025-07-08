import AppConfig from "@/lib/config";
import mockHistory from "@/mocks/historial-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 });
    }

    // Obtener parámetros del body
    const body = await request.json();
    const limit = parseInt(body.limit ?? "10");
    const lastEvaluatedKey = body.lastEvaluatedKey;

    // Construir el body para enviar al backend
    const backendBody: any = {
      limit: limit,
    };

    // Solo agregar lastEvaluatedKey si existe
    if (lastEvaluatedKey) {
      backendBody.lastEvaluatedKey = lastEvaluatedKey;
    }

    // Hacer la llamada al backend
    const response = await axios.post(AppConfig.historialUrl(), backendBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Usar el header completo "Bearer token"
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("❌ Error fetching historial:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    if (error.response?.status === 403) {
      return NextResponse.json(
        {
          error: "Acceso denegado - 403 Forbidden",
          details: error.response.data,
          url: error.config?.url,
        },
        { status: 403 }
      );
    }

    // En caso de error, devolver el mock como fallback
    return NextResponse.json(mockHistory);
  }
}
