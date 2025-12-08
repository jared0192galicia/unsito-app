'use client';
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import cn from '@/utils/cn';
import { useNavbarStore } from '@/context/navbar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const { active, setActive, links } = useNavbarStore();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'w-full sticky top-0 z-50 px-8 py-3 flex items-center justify-between transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md'
          : 'bg-[#e8f0f7] border-b border-[#b9cde3]'
      )}
    >
      <div className="font-['Josefin_Slab'] text-xl text-[#0c1d33] font-semibold">
        UNSITO
      </div>

      <ul className="flex gap-10 text-[#0c1d33] font-jaldi text-lg">
        {links.map((link, index: number) => (
          <li
            key={index}
            className={cn(
              'cursor-pointer font-jaldi font-normal transition-all duration-500',
              {
                'font-bold': active === link.name,
              }
            )}
            onClick={() => {
              setActive(link.name);
              router.push(link.path);
            }}
          >
            {link.name}
          </li>
        ))}
      </ul>

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
