"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-50"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-highlight via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              🎬 UCM Tracker
            </h1>
            <p className="text-2xl md:text-3xl text-text-secondary mb-4">
              Sigue tu progreso en el
            </p>
            <p className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Universo Cinematográfico de Marvel
            </p>
            <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
              Marca las películas y series que has visto, sigue tu progreso y nunca te pierdas
              ningún contenido del UCM. Todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="px-8 py-4 bg-highlight hover:bg-highlight/80 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-highlight/50"
              >
                Comenzar ahora
              </Link>
              <Link
                href="/auth/signin"
                className="px-8 py-4 bg-card-bg hover:bg-card-hover border-2 border-border-color rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card-bg/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-primary">
            Características
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card-bg rounded-2xl p-8 border-2 border-border-color hover:border-highlight transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary">Seguimiento Completo</h3>
              <p className="text-text-secondary">
                Marca todas las películas y series del UCM que has visto y sigue tu progreso
                en tiempo real.
              </p>
            </div>
            <div className="bg-card-bg rounded-2xl p-8 border-2 border-border-color hover:border-highlight transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary">Filtros Inteligentes</h3>
              <p className="text-text-secondary">
                Filtra por películas, series, vistas o no vistas. Encuentra exactamente lo que
                buscas.
              </p>
            </div>
            <div className="bg-card-bg rounded-2xl p-8 border-2 border-border-color hover:border-highlight transition-all hover:transform hover:scale-105">
              <div className="text-5xl mb-4">☁️</div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary">Progreso Guardado</h3>
              <p className="text-text-secondary">
                Tu progreso se guarda en la nube. Accede desde cualquier dispositivo y nunca
                pierdas tu información.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-text-primary">
              Todo el Universo Marvel en un lugar
            </h2>
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-card-bg rounded-xl p-6 border-2 border-border-color">
                <div className="text-4xl font-bold text-highlight mb-2">56+</div>
                <div className="text-text-secondary">Contenidos</div>
              </div>
              <div className="bg-card-bg rounded-xl p-6 border-2 border-border-color">
                <div className="text-4xl font-bold text-highlight mb-2">6</div>
                <div className="text-text-secondary">Fases</div>
              </div>
              <div className="bg-card-bg rounded-xl p-6 border-2 border-border-color">
                <div className="text-4xl font-bold text-highlight mb-2">∞</div>
                <div className="text-text-secondary">Diversión</div>
              </div>
            </div>
            <p className="text-lg text-text-secondary mb-8">
              Desde Iron Man hasta las últimas series de Disney+, mantén un registro completo
              de tu viaje por el UCM.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block px-8 py-4 bg-gradient-to-r from-highlight to-pink-400 hover:from-highlight/80 hover:to-pink-400/80 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Comienza a rastrear ahora
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-highlight/20 via-pink-400/20 to-yellow-400/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-text-primary">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Únete ahora y comienza a rastrear tu progreso en el UCM
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-10 py-5 bg-highlight hover:bg-highlight/80 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-highlight/50"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card-bg border-t-2 border-border-color py-8">
        <div className="container mx-auto px-4 text-center text-text-secondary">
          <p>© 2024 UCM Tracker. Hecho con ❤️ para los fans de Marvel</p>
        </div>
      </footer>
    </div>
  );
}
