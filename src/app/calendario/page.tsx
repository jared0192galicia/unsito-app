'use client';

import CalendarActivities from '@/components/home/calendar';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import cn from '@/utils/cn';

export default function CalendarPage() {
  return (
    <div className="bg-app-white min-h-screen">
      <Navbar />

      <main className="py-5 px-2 sm:p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-[#79170f] text-center">
          Calendario de UNSIS
        </h1>

        {/* Contenedor del contenido vacío */}
        <div
          className={cn(
            'w-full max-w-4xl sm:p-10 bg-white rounded-xl shadow-2xl',
            'text-center border-t-4 border-[#77a5c2] flex items-center gap-4 flex-col',
          )}
        >
          <CalendarActivities></CalendarActivities>
        </div>
      </main>

      {/* 3. PIE DE PÁGINA */}
      <Footer />
    </div>
  );
}
