"use client";
import { Home, Newspaper, Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0a3550] to-[#053658] text-white py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Columna 1 - Logo */}
        <div>
          <h2 className="font-['Josefin_Slab'] text-2xl font-semibold">
            EL UNSITO
          </h2>
          <p className="text-sm mt-2 text-gray-300 font-jaldi">
            Periodico digital UNSIS.
          </p>
        </div>

        {/* Columnas 2, 3 y 4 - Enlaces rápidos */}
        {[1, 2, 3].map((n) => (
          <div key={n}>
            <h3 className="font-jaldi text-lg font-semibold mb-4">
              Enlaces rápidos
            </h3>

            <ul className="space-y-3 font-jaldi">
              <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <Home size={18} /> Inicio
              </li>

              <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <Newspaper size={18} /> Noticias
              </li>

              <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <Calendar size={18} /> Calendario
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Línea inferior */}
      <div className="text-center mt-10 text-gray-300 text-sm font-jaldi">
        © {new Date().getFullYear()} EL UNSITO — Todos los derechos reservados.
      </div>
    </footer>
  );
}
