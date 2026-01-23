'use client';

import cn from '@/utils/cn';
import { useState, ReactNode, useEffect } from 'react';

type InputProps = {
  label: string;
  name: string;
  value?: string; // ⬅ AHORA ES OPCIONAL
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: ReactNode;
  change: (name: string, value: string) => void;
};

export default function Input({
  label,
  name,
  type = 'text',
  change,
  placeholder,
  icon,
  className = '',
  value: externalValue, // ⬅ Renombrado para no chocar con el estado interno
}: InputProps) {
  // Inicializamos con el valor externo si existe
  const [internalValue, setInternalValue] = useState(externalValue || '');

  // Sincronización: Si el 'value' del padre cambia (ej: por Gemini), actualizamos el estado local
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const onChange = (newValue: string) => {
    setInternalValue(newValue);
    change(name, newValue);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <label className="text-xs font-bold text-slate-500 uppercase">
        {label}
      </label>

      <div className="relative w-full">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-app-blue-700/70 pointer-events-none">
            {icon}
            <div className="bg-app-blue-600/60 h-[60%] w-[0.5px] ml-2"></div>
          </span>
        )}

        <input
          id={name}
          placeholder={placeholder}
          name={name}
          type={type}
          value={internalValue} // ⬅ Usamos el valor sincronizado
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-lg border border-app-blue-600 bg-white',
            'py-2 text-gray-700 transition outline-none',
            'focus:border-app-blue-700 focus:ring-2 focus:ring-app-blue-600',
            icon ? 'pl-10 pr-3' : 'px-3',
          )}
        />
      </div>
    </div>
  );
}
