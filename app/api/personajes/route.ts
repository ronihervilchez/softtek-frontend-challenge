import { NextResponse } from "next/server";
import mockData from "@/mocks/fusionados-mock.json";

export async function GET(request: Request) {
  return NextResponse.json(mockData);
}
