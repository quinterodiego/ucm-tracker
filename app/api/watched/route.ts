import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getWatchedItems,
  addWatchedItem,
  removeWatchedItem,
} from "@/lib/googleSheets";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const itemIds = await getWatchedItems(session.user.id);

    return NextResponse.json({ watchedItems: itemIds });
  } catch (error) {
    console.error("Error fetching watched items:", error);
    return NextResponse.json(
      { error: "Error al obtener items vistos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { itemId } = await request.json();

    if (!itemId || typeof itemId !== "number") {
      return NextResponse.json(
        { error: "itemId es requerido" },
        { status: 400 }
      );
    }

    const success = await addWatchedItem(session.user.id, itemId);

    if (!success) {
      return NextResponse.json(
        { error: "Error al marcar item como visto" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Item marcado como visto" });
  } catch (error) {
    console.error("Error marking item as watched:", error);
    return NextResponse.json(
      { error: "Error al marcar item como visto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { itemId } = await request.json();

    if (!itemId || typeof itemId !== "number") {
      return NextResponse.json(
        { error: "itemId es requerido" },
        { status: 400 }
      );
    }

    const success = await removeWatchedItem(session.user.id, itemId);

    if (!success) {
      return NextResponse.json(
        { error: "Error al desmarcar item" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Item desmarcado" });
  } catch (error) {
    console.error("Error unmarking item:", error);
    return NextResponse.json(
      { error: "Error al desmarcar item" },
      { status: 500 }
    );
  }
}
