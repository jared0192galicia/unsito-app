'use client';

import cn from '@/utils/cn';
import { useEffect, useState } from 'react';
import { FaNoteSticky, FaUser } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import Span from '@/components/admin/home/span';
import Graph from '@/components/admin/home/graph';
import Greetings from '@/components/admin/home/greetings';
import { TbEyeFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/shared/admin/navbar';

export default function Dashboard() {
  const [operatingDays, setOperatingDays] = useState(0);
  const { visitsTotal, visitsToday } = { visitsToday: 10, visitsTotal: 20 };
  const router = useRouter();

  useEffect(() => {
    const startDate = new Date('2025-11-10T00:00:00Z');
    const today = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    today.setUTCHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setOperatingDays(diffDays);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <AdminNavbar />
      <div className='py-4'></div>

      <Greetings />

      <div
        className={cn(
          'justify-items-center py-4 gap-5',
          'grid grid-cols-2 px-10 md:gap-7',
          'w-full md:flex md:justify-center',
        )}
      >
        <Span
          span="K"
          stats={true}
          color="#4F6EDF"
          icon={TbEyeFilled}
          number={visitsTotal}
          text="Visitantes Totales"
        />
        <Span
          stats={true}
          icon={FaUser}
          color="#CF6161"
          number={visitsToday}
          text="Visitantes del Día"
        />
        <Span
          span="días"
          icon={FaHeart}
          color="#4FB265"
          text="Funcionamiento"
          number={operatingDays}
        />
        <Span
          number={128}
          color="#6AA4C8"
          text="Publicaciones"
          icon={FaNoteSticky}
        />
      </div>

      <div className="w-full px-10 gap-4 flex flex-col mb-4 lg:mb-0 lg:flex-row">
        <div className="w-full lg:w-4/5">
          <Graph />
        </div>

        <div
          className={cn(
            'w-full lg:w-1/5 flex flex-row',
            'lg:flex-col gap-5 justify-center',
          )}
        >
          <Span
            span="Publicaciones"
            color="#CF6161"
            className="bg-app-blue-600 text-white"
            icon={FaNoteSticky}
            onClick={() => router.push('/admin/noticias')}
          />
          <Span
            span="Calendario"
            color="#6AA4C8"
            className="bg-app-blue-600/75 text-white"
            icon={FaNoteSticky}
          />
          <Span
            span="Cuentas"
            color="#4FB265"
            className="bg-app-blue-600/50 text-app-blue-800"
            icon={FaNoteSticky}
            onClick={() => router.push('/admin/cuentas')}
          />
        </div>
      </div>
    </div>
  );
}
