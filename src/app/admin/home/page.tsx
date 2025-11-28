'use client';

import cn from '@/utils/cn';
import { useEffect } from 'react';
import api from '@/services/magicFetch';
import { FaNoteSticky, FaUser } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
// import Menu from '@/components/menuAdmin';
// import { TbEyeFilled } from 'react-icons/tb';
// import { FaNoteSticky } from 'react-icons/fa6';
import Span from '@/components/admin/home/span';
import Graph from '@/components/admin/home/graph';
import Greetings from '@/components/admin/home/greetings';
import useDashboardStore from '@/stores/useDashboardStore';
import { TbEyeFilled } from 'react-icons/tb';
// import useDashboardStore from '@/context/useDashboardStore';

export default function Dashboard() {
  const {
    messages,
    visitsTotal,
    visitsToday,
    operatingDays,

    setVisits,
    setMessages,
    setVisitsToday,
    setVisitsTotal,
    setOperatingDays,
    setVisitsFiltered,
  } = useDashboardStore();

  useEffect(() => {
    // Calcular días desde el 1 de noviembre
    const startDate = new Date('2025-11-01T00:00:00Z');
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
      // const response = await api.dashboard.getGeneral();

      // const { mensajes, visitas, visitasHoy, visitasTotales } = response.data;

      // setVisits(visitas);
      // setVisitsFiltered(visitas);
      // setMessages(mensajes);
      // setVisitsToday(visitasHoy);
      // setVisitsTotal(visitasTotales);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      {/* <Menu /> */}

      <Greetings />

      <div
        className={cn(
          'justify-items-center py-4 gap-5',
          'grid grid-cols-2 px-10 md:gap-7',
          'w-full md:flex md:justify-center'
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
          // number={messages}
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
            'lg:flex-col gap-5 justify-center'
          )}
        >
          <Span
            // number={128}
            span="Publicaciones"
            color="#CF6161"
            className="bg-app-blue-600 text-white"
            // text="Producto Mas Visto"
            icon={FaNoteSticky}
          />
          <Span
            // number={168}
            span="Calendario"
            color="#6AA4C8"
            className="bg-app-blue-600/75"
            // text="Producto Menos Visto"
            icon={FaNoteSticky}
          />
          <Span
            // number={168}
            span="Cuentas"
            color="#4FB265"
            className="bg-app-blue-600/50"
            // text="Mejor Categoria"
            icon={FaNoteSticky}
          />
        </div>
      </div>
    </div>
  );
}
