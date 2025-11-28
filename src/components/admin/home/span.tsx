import cn from '@/utils/cn';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { TfiStatsUp } from 'react-icons/tfi';

export default function Span({
  icon,
  text,
  span,
  color,
  stats,
  image,
  number,
  className,
}: {
  text?: string;
  span?: string;
  color: string;
  className?: string;
  icon?: IconType;
  image?: string;
  stats?: boolean;
  number?: number;
}) {
  const IconComponent = icon;

  return (
    <div
      className={cn(
        'bg-app-gray-700/10 flex flex-col md:flex-row',
        'items-center w-full max-w-xs min-h-[7rem] gap-2 rounded-lg p-4',
        className
      )}
    >
      <div className="flex w-full md:w-2/5 items-center justify-center">
        <div
          className={cn(
            'w-12 h-12 rounded-lg',
            'flex items-center justify-center'
          )}
          style={{ backgroundColor: `${color}33` }}
        >
          {IconComponent && (
            <IconComponent className="w-5 h-5" style={{ color: color }} />
          )}
          {image && <Image src={image} alt="Articulo" width={20} height={20} />}
        </div>
      </div>

      <div className="flex w-full md:w-3/5 flex-col justify-center">
        <span
          className={cn(
            'text-xs lg:text-sm text-gray-500',
            'break-words line-clamp-2 hidden md:flex'
          )}
        >
          {text}
        </span>

        <div className="flex items-center justify-center md:justify-start gap-1 mt-1 flex-wrap">
          {number !== undefined && (
            <span className="text-sm md:text-lg whitespace-nowrap">
              {' '}
              {number}{' '}
            </span>
          )}
          {span && (
            <span className="text-sm md:text-lg break-words"> {span} </span>
          )}
          {stats && <TfiStatsUp className="text-app-blue-900 ml-2" />}
        </div>
      </div>
    </div>
  );
}
