'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import cn from '@/utils/cn';

const TAGS = [
  'Todo',
  'Academia',
  'Cultura',
  'Deportes',
  'Comunidad',
  'Eventos',
] as const;

export default function NewsFilterBar() {
  const [selectedTag, setSelectedTag] =
    useState<(typeof TAGS)[number]>('Todo');
  const [search, setSearch] = useState('');

  return (
    <div className="w-full my-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* TAGS */}
      <div className="flex flex-wrap gap-3 relative">
        {TAGS.map((tag) => {
          const isActive = selectedTag === tag;

          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                'relative px-4 py-2 rounded-xl border transition-all text-sm cursor-pointer overflow-hidden',
                'hover:shadow-sm hover:-translate-y-[1px]',
                'bg-gray-100 border-gray-200 text-gray-600'
              )}
            >
              {/* BURBUJA DINÁMICA */}
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-blue-300/60 border border-blue-400 rounded-xl"
                />
              )}

              {/* TEXTO */}
              <span
                className={cn(
                  'relative z-10',
                  isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
                )}
              >
                {tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH */}
      <div className="w-full md:w-64">
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
