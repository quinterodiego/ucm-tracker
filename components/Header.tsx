"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="text-center mb-10 py-8">
      <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-highlight to-pink-400 bg-clip-text text-transparent">
        🎬 UCM Tracker
      </h1>
      <p className="text-text-secondary text-lg">
        Sigue tu progreso en el Universo Cinematográfico de Marvel
      </p>
      {session && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="text-sm text-text-secondary">
            {session.user?.name && (
              <span>Hola, {session.user.name}</span>
            )}
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-accent hover:bg-card-hover rounded-lg transition-colors text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
