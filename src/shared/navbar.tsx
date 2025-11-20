'use client';
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function Navbar() {
  const [active, setActive] = useState('Noticias');
  const [scrolled, setScrolled] = useState(false);

  const links = ['Inicio', 'Noticias', 'Eventos', 'Calendario'];

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // activa el efecto después de 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full sticky top-0 z-50 px-8 py-3 flex items-center justify-between transition-all duration-300 
        ${scrolled 
          ? 'backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md' 
          : 'bg-[#e8f0f7] border-b border-[#b9cde3]'
        }
      `}
    >
      {/* Logo */}
      <div className="font-['Josefin_Slab'] text-xl text-[#0c1d33] font-semibold">
        UNSITO
      </div>

      {/* Links */}
      <ul className="flex gap-10 text-[#0c1d33] font-jaldi text-lg">
        {links.map((link) => (
          <li
            key={link}
            className={`cursor-pointer transition font-jaldi ${
              active === link ? 'font-bold' : 'font-normal'
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
          src="https://i.pravatar.cc/40?img=47"
          alt="perfil"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
}
