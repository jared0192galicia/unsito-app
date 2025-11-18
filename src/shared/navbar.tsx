"use client";
import { useState } from "react";
import { Bell } from "lucide-react"; // icono de campana (instala con npm i lucide-react)

export default function Navbar() {
  const [active, setActive] = useState("Noticias");

  const links = ["Inicio", "Noticias", "Eventos", "Calendario"];

  return (
    <nav className="w-full bg-[#e8f0f7] border border-[#b9cde3] px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="font-['Josefin_Slab'] text-xl text-[#0c1d33] font-semibold">
        EL UNSITO
      </div>

      {/* Links */}
      <ul className="flex gap-10 text-[#0c1d33] font-jaldi text-lg">
        {links.map((link) => (
          <li
            key={link}
            className={`cursor-pointer transition font-jaldi ${
              active === link ? "font-bold" : "font-normal"
            }`}
            onClick={() => setActive(link)}
          >
            {link}
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <div className="bg-[#0c1d33] p-2 rounded-full cursor-pointer">
          <Bell className="text-white w-5 h-5" />
        </div>
        <img
          src="https://i.pravatar.cc/40?img=47" // avatar de ejemplo
          alt="perfil"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
}
