import cn from '@/utils/cn';
import { useState, ReactNode } from 'react';

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: ReactNode; // ⬅ NUEVO
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
}: InputProps) {
  const [value, setValue] = useState('');

  const onChange = (value: string) => {
    setValue(value);
    change(name, value);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <label htmlFor={name} className="text-sm font-medium text-app-blue-800">
        {label}
      </label>

      {/* Contenedor relativo para icono + input */}
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-lg border border-app-blue-600 bg-white',
            'py-2 text-gray-700 transition outline-none',
            'focus:border-app-blue-700 focus:ring-2 focus:ring-app-blue-600',
            icon ? 'pl-10 pr-3' : 'px-3' // ⬅ padding ajustado si hay icono
          )}
        />
      </div>
    </div>
  );
}
