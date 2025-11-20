import cn from '@/utils/cn';
import { useState } from 'react';

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  change: (name: string, value: string) => void;
};

export default function Input({
  label,
  name,
  type = 'text',
  change,
  placeholder,
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
      <input
        id={name}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-lg border border-app-blue-600 bg-white',
          'px-3 py-2 text-gray-700 transition outline-none',
          'focus:border-app-blue-700 focus:ring-2 focus:ring-app-blue-600'
        )}
      />
    </div>
  );
}
