'use client';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import cn from '@/utils/cn';
import { createPortal } from 'react-dom';
import Label from './label';

type Day = {
  name: string;
  abbreviation: string;
};

const weekDays: Day[] = [
  { name: 'Lunes', abbreviation: 'Lun' },
  { name: 'Martes', abbreviation: 'Mar' },
  { name: 'Miércoles', abbreviation: 'Mié' },
  { name: 'Jueves', abbreviation: 'Jue' },
  { name: 'Viernes', abbreviation: 'Vie' },
  { name: 'Sábado', abbreviation: 'Sáb' },
  { name: 'Domingo', abbreviation: 'Dom' }
];

type BaseProps = {
  label?: string;
  dropdown?: boolean;
  required?: boolean;
  className?: string;
};

type RangeOrMultiple =
  | { range: true; multiple?: false }
  | { multiple: true; range?: false }
  | { range?: false; multiple?: false };

type WithHandleChange = {
  handleChange: (key: any, value: string | string[]) => void;
  propertyName: string;
  handleSet?: never;
};

type WithHandleSet = {
  handleSet: (value: string | string[]) => void;
  handleChange?: never;
  propertyName?: never;
};

type CalendarProps = BaseProps &
  RangeOrMultiple &
  (WithHandleChange | WithHandleSet);

export default function CalendarPiker({
  propertyName,
  className,
  label,
  handleChange,
  handleSet,
  dropdown = false,
  required = false,
  range = false,
  multiple = false
}: CalendarProps) {
  const [isClient, setIsClient] = useState(false);
  const [focusDate, setFocusDate] = useState<Date | null>(null);
  const [monthDays, setMonthDays] = useState<any>([]);
  const [coors, setCoors] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  // Marcar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
    // Usar una fecha fija inicialmente para evitar problemas de hidratación
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la hora
    setFocusDate(today);
  }, []);

  useEffect(() => {
    if (focusDate) {
      init(focusDate);
    }
  }, [focusDate]);

  // Selecion de fecha individual
  useEffect(() => {
    if (!propertyName && !handleSet)
      console.warn('CalendarPiker.tsx: \n La propiedad propertyName no existe');

    const date = formatDate(selectedDate);
    if (handleChange) handleChange(propertyName, date);
    if (handleSet) handleSet(date);
  }, [selectedDate]);

  // Selecion de fecha por rango o multiple
  useEffect(() => {
    if (!range && !multiple && !selectedRange.length) return;

    if (!propertyName && !handleSet)
      console.warn('CalendarPiker.tsx: \n La propiedad propertyName no existe');

    const dates = selectedRange.map(formatDate).join(' ~ ');
    if (handleChange) handleChange(propertyName, dates);
    if (handleSet) handleSet(dates);
  }, [selectedRange]);

  // cerrar calendario desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdown]);

  // Ajustar posición del calendario en moviles (solo dropdown)
  useEffect(() => {
    handleResize();
  }, [open]);

  const handleResize = () => {
    const dd = calendarWrapperRef.current;
    if (!dd) return;

    const { width, x, y } = dd.getBoundingClientRect();
    const meta = { x, y };

    const viewportWidth = window.screen.width;

    if (viewportWidth < x + width) {
      meta.x = 0 - (x + width - viewportWidth);
      const margin = (viewportWidth - width) / 2;
      setCoors(meta.x - margin);
    }
  };

  const init = (focusDate: Date) => {
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0).getDate();

    const firstDayIndex = firstDayOfMonth.getDay(); // Sun = 0
    const totalDays = lastDayOfMonth.getDate();
    const prevDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

    // DÍAS DEL MES ANTERIOR - AHORA VISIBLES
    for (let i = prevLastDay - prevDays + 1; i <= prevLastDay; i++) {
      days.push({
        day: i,
        isCurrentMonth: false, // Pero ahora se muestran
        date: new Date(year, month - 1, i)
      });
    }

    // MES ACTUAL
    for (let day = 1; day <= totalDays; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }

    // DÍAS DEL PRÓXIMO MES - AHORA VISIBLES
    const totalCells = days.length;
    const extraDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= extraDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false, // Pero ahora se muestran
        date: new Date(year, month + 1, i)
      });
    }

    setMonthDays(days);
  };

  const capitalizeFirst = (text: string | undefined) => {
    if (!text) return text;

    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCurrentMonth = () => {
    if (!focusDate) return '';
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
      focusDate
    );

    return capitalizeFirst(month);
  };

  const getCurrentYear = () => focusDate ? focusDate.getFullYear() : '';

  const handlePrevMonth = () => {
    if (!focusDate) return;
    setFocusDate(
      new Date(focusDate.getFullYear(), focusDate.getMonth() - 1, 1)
    );
  }

  const handleNextMonth = () => {
    if (!focusDate) return;
    setFocusDate(
      new Date(focusDate.getFullYear(), focusDate.getMonth() + 1, 1)
    );
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (range || multiple) {
      return (
        selectedRange &&
        selectedRange.some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
      );
    }
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Compara si una fecha esta dentro del rango seleccionado
  const isBettenRange = (date: Date) => {
    const [first, second] = selectedRange;
    if (range && first && second) {
      const isGreaterThatFirst = date > first;
      const isGreaterThatSecond = date < second;

      return isGreaterThatFirst && isGreaterThatSecond;
    }
    return false;
  };

  const removeIndex = (arr: Date[], indexToRemove: number): Date[] => {
    return arr.filter((_, i) => i !== indexToRemove);
  };

  const handleSelectDate = (date: Date, isCurrentMonth: boolean) => {
    // Bloquear días que no son del mes actual
    if (!isCurrentMonth) return;
    
    if (range || multiple) {
      const exist = selectedRange.findIndex((d) => date == d);

      // Fecha nueva
      if (exist === -1) {
        if (range && selectedRange.length > 1) setSelectedRange([]);
        setSelectedRange((prev) =>
          [...prev, date].sort((a, b) => a.getTime() - b.getTime())
        );

        if (range && selectedRange.length == 1) setOpen(false);
        // Eliminar una fecha seleccionada
      } else {
        setSelectedRange((prev) => removeIndex(prev, exist));
      }
      return;
    }

    const exist = date == selectedDate;

    setSelectedDate(exist ? null : date);
    if (dropdown) setOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const ShowLabel = () => {
    return label ? (
      <Label>{`${label}${required ? '*' : ''}`}</Label>
    ) : (
      <></>
    );
  };

  const getDisplayText = () => {
    if (range || multiple)
      if (selectedRange.length) return selectedRange.map(formatDate).join(', ');

    return selectedDate ? (
      formatDate(selectedDate)
    ) : (
      <span className='font-light text-gray-500'>Selecciona una fecha</span>
    );
  };

  const Calendar = () => {
    if (!isClient || !focusDate) {
      return (
        <div className="flex items-center justify-center py-8">
          <div>Cargando calendario...</div>
        </div>
      );
    }

    return (
      <>
        <div className='mb-2 flex w-full items-center justify-between'>
          <div className='cursor-pointer' onClick={handlePrevMonth}>
            <IoIosArrowBack />
          </div>
          <span className='flex gap-2 text-lg font-medium'>
            <div>{getCurrentMonth()}</div>
            <div>{getCurrentYear()}</div>
          </span>
          <div className='cursor-pointer' onClick={handleNextMonth}>
            <IoIosArrowForward />
          </div>
        </div>
        <div className='grid w-full grid-cols-7 gap-2 text-sm'>
          {weekDays.map((day) => (
            <div
              key={day.name}
              className='flex h-8 items-center justify-center font-semibold'
            >
              {day.abbreviation}
            </div>
          ))}

          {monthDays.map(
            ({ day, isCurrentMonth, date }: any, index: number) => (
              <div
                key={index}
                onClick={() => isCurrentMonth && handleSelectDate(date, isCurrentMonth)}
                className={cn(
                  'flex aspect-square h-9 items-center justify-center rounded-full border transition-all duration-300',
                  {
                    // DÍAS DE OTROS MESES: visibles pero sin interacción
                    'text-gray-400 cursor-not-allowed opacity-70': !isCurrentMonth,
                    
                    // DÍAS DEL MES ACTUAL: con interacción completa
                    'cursor-pointer hover:bg-blue-100': isCurrentMonth && !isSelected(date),
                    'bg-blue-500/20 text-blue-800': isCurrentMonth && isBettenRange(date),
                    'bg-blue-500 text-white': isCurrentMonth && isSelected(date),
                    'border-blue500 border-solid border-blue-400 text-blue-600':
                      isCurrentMonth && isToday(date) && !isSelected(date) && !isBettenRange(date),
                  }
                )}
              >
                {day}
              </div>
            )
          )}
        </div>
      </>
    );
  };

  // Si no estamos en el cliente, mostrar un placeholder simple
  if (!isClient) {
    if (dropdown) {
      return (
        <div className={cn('relative w-full', className)}>
          <ShowLabel />
          <button
            type='button'
            className={cn(
              'text-md w-full cursor-text rounded-md border border-solid border-gray-300 px-3 py-3 text-start',
              'font-noto text-preslow-dark-gray bg-white',
              'max-w[210px] overflow-hidden text-ellipsis whitespace-nowrap'
            )}
          >
            <span className='font-light text-gray-500'>Cargando...</span>
          </button>
        </div>
      );
    }
    
    return (
      <div className={cn('min-w-96 rounded-lg border bg-white p-4 shadow', className)}>
        <ShowLabel />
        <div className="flex items-center justify-center py-8">
          Cargando calendario...
        </div>
      </div>
    );
  }

  // Calendario Dropdown
  if (dropdown) {
    return (
      <div ref={wrapperRef} className={cn('relative w-full', className)}>
        <ShowLabel />
        <button
          type='button'
          onClick={() => setOpen(!open)}
          className={cn(
            'text-md w-[210px] cursor-text rounded-md border border-solid border-gray-300 px-3 py-3 text-start',
            'font-noto text-preslow-dark-gray bg-white focus:border-blue-500 focus:outline-none',
            'max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap'
          )}
        >
          {getDisplayText()}
        </button>

        {/* calendario desplegable */}
        {open &&
          (
            <div
              className={cn(
                'fixed z-[40] mt-2 w-[312px]',
                'xs:w-96 rounded-lg bg-white p-4 shadow-lg',
                'border border-solid border-gray-300/70'
              )}  
              style={{ left: `${coors}px` }}
              ref={calendarWrapperRef}
            >
              {Calendar()}
            </div>
          )}
      </div>
    );
  }

  // Calendario fijo
  return (
    <div
      className={cn(
        'min-w-full rounded-lg border bg-white p-4 shadow',
        className
      )}
    >
      <ShowLabel />
      {Calendar()}
      {selectedDate && (
        <div className='mt-4 text-center text-sm text-gray-600'>
          Día seleccionado:
          <span className='font-semibold'>
            {selectedDate.toLocaleDateString('es-ES')}
          </span>
        </div>
      )}
    </div>
  );
}