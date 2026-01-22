import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AxiosResponse } from 'axios';

import { MdEdit } from 'react-icons/md';
import { DayType, HoliDay, useCalendarStorage } from '@/context/preslowCalendarStore';
import { EditDayDialog } from './editDayDialog';
import cn from '@/utils/cn';

export type Day = {
  name: string;
  abbreviation: string;
};

export type MonthDay = {
  day: number;
  isCurrentMonth: boolean;
  type?: DayType;
  content?: string;
  description?: string;
  isDashed?: boolean;
  date?: string;
};

export const weekDays: Day[] = [
  { name: 'Lunes', abbreviation: 'Lun' },
  { name: 'Martes', abbreviation: 'Mar' },
  { name: 'Miércoles', abbreviation: 'Mié' },
  { name: 'Jueves', abbreviation: 'Jue' },
  { name: 'Viernes', abbreviation: 'Vie' },
  { name: 'Sábado', abbreviation: 'Sáb' },
  { name: 'Domingo', abbreviation: 'Dom' }
];

export interface HoliDayType {
  id: number;
  name: string;
  description: string;
  backgroundColor: string;
  backgroundColorDialog: string;
  textColor: string;
}

export default function PreslowCalendarEdit({
  typeHoliday
}: {
  typeHoliday?: HoliDayType;
}) {
  const [focusDate, setFocusDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [monthDays, setMonthDays] = useState<MonthDay[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { holidays, fetchCalendar, setHolidays } = useCalendarStorage();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    fetchCalendar();
  }, []);

  useEffect(() => {
    init(focusDate);
  }, [holidays, focusDate]);

  const init = (focusDate: Date) => {
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0).getDate();
    const firstDayIndex = firstDayOfMonth.getDay(); // Sun = 0
    const totalDays = lastDayOfMonth.getDate();
    const prevDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const days: MonthDay[] = [];

    // días previos del mes
    for (let i = prevLastDay - prevDays + 1; i <= prevLastDay; i++)
      days.push({ day: i, isCurrentMonth: false });

    // días del mes actual
    for (let day = 1; day <= totalDays; day++) {
      const _day: MonthDay = { day, isCurrentMonth: true };
      const date = getDatePick(_day);
      const holiDay = isHoliDay(date);
      days.push({
        ..._day,
        type: holiDay ? holiDay.type : undefined,
        content: holiDay?.name,
        isDashed: holiDay?.isDashed,
        description: holiDay?.description,
        date: holiDay?.date
      });
    }

    // llenar con los días del proximo mes
    const totalCells = days.length;
    const extraDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= extraDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
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
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
      focusDate
    );

    return capitalizeFirst(month);
  };

  const getCurrentYear = () => {
    const year = focusDate.getFullYear();

    return year;
  };

  // Cambia el foscus del mes al enterior
  const handlePrevMonth = () => {
    const newDate = new Date(
      focusDate.getFullYear(),
      focusDate.getMonth() - 1,
      1
    );
    setFocusDate(newDate);
  };

  // Cambia el foscus del mes al siguiente
  const handleNextMonth = () => {
    const newDate = new Date(
      focusDate.getFullYear(),
      focusDate.getMonth() + 1,
      1
    );
    setFocusDate(newDate);
  };

  const makeNewArray = (ISODatePicked: string) => {
    let holiDaysAux = [...holidays];
    const existHoliDay = holiDaysAux.find(
      (holiday) => holiday.date === ISODatePicked
    );

    const newHoliDay: HoliDay = {
      date: ISODatePicked,
      name: '',
      source: '',
      type: {
        colorFondo: typeHoliday?.backgroundColor || '',
        colorFondoDialogo: typeHoliday?.backgroundColorDialog || '',
        colorTexto: typeHoliday?.textColor || '',
        id: typeHoliday?.id || 0,
        name: typeHoliday?.name || ''
      }
    };

    if (existHoliDay) {
      console.log('Existe');

      holiDaysAux = holiDaysAux.filter(
        (holiday) => holiday.date !== ISODatePicked
      );
      if (existHoliDay.type.id != newHoliDay.type.id) {
        console.log('Existe con tipo diferente');
        holiDaysAux.push(newHoliDay);
      }
    } else {
      console.log('No existe');
      holiDaysAux.push(newHoliDay);
    }

    return holiDaysAux;
  };

  const datePick = (value: { day: number; isCurrentMonth: boolean }) => {
    const { day } = value;

    const ISODatePicked = new Date(
      focusDate.getFullYear(),
      focusDate.getMonth(),
      day
    )
      .toISOString()
      .split('T')[0];

    let holiDaysAux = makeNewArray(ISODatePicked);

    setActiveIndex(null);
    setHolidays(holiDaysAux);
  };
  // Obtener un dia en especifico
  const getDatePick = (value: { day: number; isCurrentMonth: boolean }) => {
    const { day } = value;

    const datePicked = new Date(
      focusDate.getFullYear(),
      focusDate.getMonth(),
      day
    );

    return datePicked;
  };

  const isHoliDay = (day: Date) => {
    return holidays.find(
      (holiday: any) => holiday.date == day.toISOString().split('T')[0]
    );
  };

  const handleClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={cn(
        'rounded-lg bg-white px-4 py-4 font-noto text-preslow-dark-gray',
        'border border-solid border-slate-200'
      )}
    >
      <EditDayDialog
        // show={show}
        visible={showDialog}
        onHide={() => {
          setShowDialog(false);
        }}
        date={selectedDay}
      />
      {/* Header */}
      <div className={cn('flex items-center justify-between', 'relative')}>
        {/* Mes anterior */}
        <div className='cursor-pointer' onClick={handlePrevMonth}>
          <IoIosArrowBack />
        </div>

        {/* Titulo de mes y año */}
        <span className={cn('flex gap-4', 'text-lg')}>
          <div>{getCurrentMonth()}</div>
          <div>{getCurrentYear()}</div>
        </span>

        {/* Mes siguiente */}
        <div className='cursor-pointer' onClick={handleNextMonth}>
          <IoIosArrowForward />
        </div>
      </div>

      <div className='my-4 h-px w-full bg-gray-200' />

      <div className='grid grid-cols-7 gap-1'>
        {weekDays.map((day: Day) => (
          <div
            key={day.name}
            className='flex aspect-square h-8 justify-center font-bold'
          >
            {day.abbreviation}
          </div>
        ))}

        {monthDays.map((monthDay: MonthDay, index: number) => {
          const { day, isCurrentMonth, type, date, isDashed, description } =
            monthDay;
          return (
            <div key={index} className='group relative'>
              {type ? (
                <>
                  <div
                    className={cn(
                      'absolute left-7 z-10 ml-2 flex h-5 w-5 -translate-y-1/2 items-center justify-center shadow-md shadow-gray-400',
                      'cursor-pointer rounded-full border bg-sky-200 p-1 text-sm text-white shadow-lg hover:bg-sky-300'
                    )}
                    onClick={() => {
                      setSelectedDay(date || '');
                      setShowDialog(true);
                    }}
                  >
                    <MdEdit className='text-5xl' />
                  </div>
                  <div
                    onClick={() => {
                      if (!isCurrentMonth) return;
                      datePick(monthDay);
                    }}
                  >
                    <span className='relative flex size-3'>
                      <span
                        style={{ backgroundColor: type.colorFondo }}
                        className={cn(
                          'absolute inline-flex  h-9 w-9',
                          'animate-ping rounded-full opacity-85'
                        )}
                      ></span>
                      <span
                        onMouseOver={() => handleClick(index)}
                        onMouseOut={() => handleClick(index)}
                        className={cn(
                          'relative inline-flex aspect-square size-3 h-9 w-9 text-white',
                          'cursor-pointer items-center justify-center rounded-full'
                        )}
                        style={{
                          backgroundColor: type.colorFondo,
                          backgroundImage: isDashed
                            ? `repeating-linear-gradient(
                          45deg,
                          ${type.colorFondo},
                          ${type.colorFondo} 5px,
                          gray 5px,
                          gray 10px
                        )`
                            : undefined,
                          color: type.colorTexto
                        }}
                      >
                        {day}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className={cn(
                    'flex aspect-square h-9 cursor-pointer select-none items-center justify-center rounded-full',
                    {
                      'text-slate-300': !isCurrentMonth
                    }
                  )}
                  onClick={() => {
                    if (!isCurrentMonth) return;
                    datePick(monthDay);
                  }}
                >
                  {day}
                </div>
              )}
              {/* Tooltip */}
              {activeIndex === index && (
                <div
                  className={cn(
                    'absolute left-10 top-5 z-10 ml-2 w-40 -translate-y-1/2 ',
                    'rounded-xl border p-3 text-sm shadow-lg'
                  )}
                  style={{
                    backgroundColor: monthDay.type?.colorFondoDialogo
                  }}
                >
                  {description ||
                    monthDay.content ||
                    monthDay.type?.descripcion ||
                    'Día festivo'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
