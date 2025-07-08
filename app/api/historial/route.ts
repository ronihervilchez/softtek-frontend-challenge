import AppConfig from "@/lib/config";
import mockHistory from "@/mocks/historial-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");
    console.log(`🚀 ~ route.ts:10 ~ authHeader:`, authHeader)

    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 });
    }

    // Obtener limit de query params o usar 10 por defecto
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "10");

    // Usar la URL del config
    const response = await axios.get(AppConfig.historialUrl(limit), {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Usar el header completo "Bearer token"
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching historial:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }

    // En caso de error, devolver el mock como fallback
    return NextResponse.json(mockHistory);
  }
}
