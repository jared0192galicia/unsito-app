'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import cn from '@/utils/cn';
import { useCategories } from '@/hooks/useNotes';

interface NewsFilterBarProps {
  onCategoryChange?: (categoryId: number | null) => void;
  onSearchChange?: (search: string) => void;
}

export default function NewsFilterBar({ onCategoryChange, onSearchChange }: NewsFilterBarProps) {
  const { categories, loading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  // Añade opción "Todo" al inicio
  const categoryOptions = useMemo(
    () => [{ id: null, name: 'Todo' }, ...categories],
    [categories]
  );

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    onCategoryChange?.(categoryId);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  if (loading) {
    return (
      <div className="w-full my-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* TAGS */}
      <div className="flex flex-wrap gap-3 relative">
        {categoryOptions.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <button
              key={category.id ?? 'all'}
              onClick={() => handleCategoryChange(category.id)}
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
                {category.name}
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
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
