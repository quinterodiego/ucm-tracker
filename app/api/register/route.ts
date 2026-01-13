import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/lib/googleSheets";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const success = await createUser(
      email,
      name || email.split("@")[0],
      hashedPassword
    );

    if (!success) {
      return NextResponse.json(
        { error: "Error al crear el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Usuario creado exitosamente", userId: email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}
