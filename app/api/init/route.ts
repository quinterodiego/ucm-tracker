import { NextResponse } from "next/server";
import { initializeSheets } from "@/lib/googleSheets";

export async function POST() {
  try {
    const success = await initializeSheets();
    
    if (!success) {
      return NextResponse.json(
        { error: "Error al inicializar las hojas" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Hojas inicializadas correctamente" });
  } catch (error) {
    console.error("Error initializing sheets:", error);
    return NextResponse.json(
      { error: "Error al inicializar las hojas" },
      { status: 500 }
    );
  }
}
