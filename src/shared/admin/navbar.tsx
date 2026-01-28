'use client';
import { useState, useEffect } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import cn from '@/utils/cn';
import { useAdminNavbarStore } from '@/context/adminNavbar';

export default function AdminNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { active, setActive, links } = useAdminNavbarStore();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (name: string, path: string) => {
    setActive(name);
    router.push(path);
    setOpen(false);
  };

  return (
    <nav
      className={cn(
        'w-full sticky top-0 z-50 px-6 py-3 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md'
          : 'bg-[#e8f0f7] border-b border-[#b9cde3]',
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl text-[#0c1d33] font-semibold">Unsito</div>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-10 text-[#0c1d33] text-lg font-sans">
          {links.map((link, index) => (
            <li
              key={index}
              className={cn(
                'cursor-pointer transition-all duration-300',
                active === link.name && 'font-bold',
              )}
              onClick={() => goTo(link.name, link.path)}
            >
              {link.name}
            </li>
          ))}
          <li></li>
          <li></li>
        </ul>

        {/* Right actions desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-[#0c1d33] p-2 rounded-full cursor-pointer">
            <Bell className="text-white w-5 h-5" />
          </div>
          <img
            src="https://i.pravatar.cc/40?img=47"
            alt="perfil"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-[#0c1d33]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden mt-4 rounded-xl bg-white/80 backdrop-blur-lg shadow-lg p-4">
          <ul className="flex flex-col gap-4 text-[#0c1d33] font-jaldi text-lg">
            {links.map((link, index) => (
              <li
                key={index}
                className={cn(
                  'cursor-pointer',
                  active === link.name && 'font-bold',
                )}
                onClick={() => goTo(link.name, link.path)}
              >
                {link.name}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-6">
            <div className="bg-[#0c1d33] p-2 rounded-full">
              <Bell className="text-white w-5 h-5" />
            </div>
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="perfil"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
