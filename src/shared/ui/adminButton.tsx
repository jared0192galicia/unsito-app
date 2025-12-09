import cn from '@/utils/cn';
import { ReactNode } from 'react';

type ButtonVariant = 'discard' | 'draft' | 'save' | 'create';

interface ButtonProps {
  variant: ButtonVariant;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant,
  onClick,
  children,
  className,
}: ButtonProps) {
  const variantClasses = {
    discard: cn(
      'flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-gray-300',
      'font-semibold text-black',
      'hover:bg-gray-500 transition'
    ),

    draft: cn(
      'flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600',
      'font-semibold text-app-white',
      'hover:bg-sky-800 transition'
    ),

    save: cn(
      'flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500',
      'font-semibold text-app-white',
      'hover:bg-teal-600 transition'
    ),

    create: cn(
      'flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600',
      'font-semibold text-white',
      'hover:bg-emerald-700 transition'
    ),
  };

  return (
    <button
      onClick={onClick}
      className={cn(variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}
