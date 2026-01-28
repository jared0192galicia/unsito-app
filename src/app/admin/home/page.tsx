'use client';

import cn from '@/utils/cn';
import { useEffect, useState } from 'react';
import {
  FaCalendar,
  FaNewspaper,
  FaNoteSticky,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import Span from '@/components/admin/home/span';
// import Graph from '@/components/admin/home/graph';
import Greetings from '@/components/admin/home/greetings';
import { TbEyeFilled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/shared/admin/navbar';

import dynamic from 'next/dynamic';
import { useAdminNavbarStore } from '@/context/adminNavbar';

// Cargamos el componente de la gráfica solo en el cliente
const Graph = dynamic(() => import('@/components/admin/home/graph'), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});

export default function Dashboard() {
  const [operatingDays, setOperatingDays] = useState(0);
  const { visitsTotal, visitsToday } = { visitsToday: 10, visitsTotal: 20 };
  const router = useRouter();
  const { active, setActive, links } = useAdminNavbarStore();

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
  
  const goTo = (name: string, path: string) => {
    setActive(name);
    router.push(path);
  };

  return (
    <div className="w-full">
      <AdminNavbar />
      <div className="py-2"></div>

      <Greetings />

      <div
        className={cn(
          'justify-items-center py-4 gap-5',
          'grid grid-cols-2 px-10 md:gap-7',
          'w-full md:flex md:justify-center',
        )}
      >
        <Span
          span="Administración de Publicaciones"
          color="#CF6161"
          className="bg-app-blue-600 text-white w-full"
          icon={FaNewspaper}
          onClick={() => goTo('Publicaciones', '/admin/noticias')}
        />
        <Span
          span="Administración de Calendario"
          color="#6AA4C8"
          className="bg-app-blue-600/75 text-white"
          icon={FaCalendar}
        />
        <Span
          span="Administración de Cuentas"
          color="#4FB265"
          className="bg-app-blue-600/50 text-app-blue-800"
          icon={FaUsers}
          onClick={() => goTo('Cuentas', '/admin/cuentas')}
        />
      </div>

      <div className="w-full px-10 gap-4 flex flex-col mb-4 lg:mb-0 lg:flex-row">
        <div className="w-full lg:w-6/8">
          <Graph />
        </div>

        {/* ADMIN */}
        <div
          className={cn(
            'rounded-lg bggray-300/20',
            'w-full lg:w-2/8 flex flex-row',
            'lg:flex-col gap-3 justify-center',
          )}
        >
          <Span
            span="K"
            stats={true}
            color="#4F6EDF"
            icon={TbEyeFilled}
            number={visitsTotal}
            text="Visitantes Totales"
            className="max-h-[90px]"
          />
          {/* <Span
            stats={true}
            icon={FaUser}
            color="#CF6161"
            number={visitsToday}
            text="Visitantes del Día"
            className="max-h-[90px]"
          /> */}
          <Span
            span="días"
            icon={FaHeart}
            color="#4FB265"
            text="Funcionamiento"
            number={operatingDays}
            className="max-h-[90px]"
          />
          <Span
            number={128}
            color="#6AA4C8"
            text="Publicaciones"
            icon={FaNoteSticky}
            className="max-h-[90px]"
          />
        </div>
      </div>
    </div>
  );
}
