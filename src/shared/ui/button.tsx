import cn from "@/utils/cn";

interface ControlButtonProps {
  onClick?: any;
  disabled?: boolean;
  icon?: any;
  label: string;
  type: 'primary' | 'secondary';
}

export function ControlButton({
  onClick = () => {},
  disabled = false,
  icon,
  label,
  type = 'primary',
}: ControlButtonProps) {
  const baseStyle = cn(
    'flex w-full text-center justify-center gap-2 rounded-md text-xs md:text-base cursor-pointer',
    'px-5 py-2 font-semibold transition-all duration-300 text-white'
  );

  const disabledStyle = 'border text-blue-500 border-app-blue-600 bg-white';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyle, {
        [disabledStyle]: disabled,
        'bg-app-blue-700': type == 'primary',
        'bg-app-gray-700/60': type == 'secondary',
      })}
    >
      {icon}
      {label}
    </button>
  );
}
