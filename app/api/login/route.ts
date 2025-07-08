import mockHistory from "@/mocks/historial-mock.json";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(mockHistory);
}
