import mockData from "@/mocks/fusionados-mock.json";
import axios from "axios";
import { NextResponse } from "next/server";
import AppConfig from "../../../lib/config";

export async function GET() {
  try {
    // Hacer la llamada al backend usando AppConfig
    const response = await axios.get(AppConfig.personajesUrl(), {
      headers: {
        "Content-Type": "application/json",
        // Agregar headers de autenticación si es necesario
        // 'Authorization': `Bearer ${token}`
      },
      timeout: 10000,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching personajes:", error);

    // En caso de error, devolver el mock como fallback
    return NextResponse.json(mockData);
  }
}
