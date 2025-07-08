import mockHistory from "@/mocks/historial-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";
import AppConfig from "@/lib/config";

export async function GET() {
  try {
    // Usar la URL del config con un límite por defecto
    const response = await axios.get(AppConfig.historialUrl(10), {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching historial:", error);
    // En caso de error, devolver el mock como fallback
    return NextResponse.json(mockHistory);
  }
}
