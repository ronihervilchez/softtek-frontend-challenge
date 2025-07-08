import AppConfig from "@/lib/config";
import mockHistory from "@/mocks/historial-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Token de autorización requerido" }, { status: 401 });
    }

    // Obtener parámetros de query
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const lastEvaluatedKey = searchParams.get("lastEvaluatedKey");

    // Construir la URL base del backend
    const baseUrl = `${AppConfig.BACKEND_API}/historial`;
    const backendUrl = new URL(baseUrl);
    
    // Agregar parámetros
    backendUrl.searchParams.append('limit', limit.toString());
    if (lastEvaluatedKey) {
      backendUrl.searchParams.append('lastEvaluatedKey', lastEvaluatedKey);
    }

    const finalUrl = backendUrl.toString();

    console.log('🔍 HISTORIAL REQUEST:');
    console.log('Frontend URL:', request.url);
    console.log('Backend URL:', finalUrl);
    console.log('Limit:', limit);
    console.log('LastEvaluatedKey:', lastEvaluatedKey ? 'Present' : 'None');

    // Hacer la llamada al backend
    const response = await axios.get(finalUrl, {
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
