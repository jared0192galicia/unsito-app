import { useState } from 'react';
import cn from '@/utils/cn';

interface ControlButtonProps {
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  type?: 'primary' | 'secondary';
}

export function ControlButton({
  onClick = () => {},
  disabled = false,
  icon,
  label,
  type = 'primary',
}: ControlButtonProps) {
  const [loading, setLoading] = useState(false);

  const baseStyle = cn(
    'flex w-full items-center justify-center gap-2 rounded-md text-xs md:text-base',
    'px-5 py-2 font-semibold transition-all duration-300',
    'disabled:cursor-not-allowed',
  );

  const disabledStyle = 'border text-blue-500 border-app-blue-600 bg-white';

  const handleClick = async () => {
    if (loading || disabled) return;

    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(baseStyle, {
        [disabledStyle]: disabled,
        'bg-app-blue-700 text-white': type === 'primary',
        'bg-app-gray-700/60 text-white': type === 'secondary',
      })}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Procesando…
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
