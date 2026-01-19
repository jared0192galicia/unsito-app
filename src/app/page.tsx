// src/app/page.tsx

import Hero from '@/components/home/hero';
import NoteTemplate from '../shared/noteTemplate';
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import Animate from '@/shared/animation';
import React from 'react';

interface NoteDetails {
  title: string;
  banner: string;
  type: string;
  date: string;
  body: string;
}

const commonBanner =
  'https://www.unsis.edu.mx/web/sites/default/files/styles/wide/public/2025-09/XVII%20SEMANA%20CULTURAS%20SS%202025%20-pag.jpg?itok=YYFMWjjB';

const newsItems: NoteDetails[] = [
  {
    title: 'XVII Semana de las Culturas de la Sierra Sur',
    banner: commonBanner,
    type: 'Evento Cultural',
    date: 'Del 12 al 17 de octubre de 2025',
    body: 'La Universidad de la Sierra Sur hace una cordial invitación a la comunidad universitaria y público en general a participar en las actividades de la XVII Semana de las Culturas de la Sierra Sur, que se  celebrará del 12 al 17 de octubre de 2025. \n Evento gratuito. Asiste y celebra nuestras culturas con música, danza, artesanías, conferencias, exposiciones y gastronomía de nuestra región.',
  },
  {
    title: 'Convocatoria de Becas para Ingeniería',
    banner: commonBanner,
    type: 'Académico',
    date: 'Vence el 30 de noviembre',
    body: 'Abierta la convocatoria para becas de apoyo a estudiantes de la carrera de Ingeniería en los Sistemas de Información.',
  },
  {
    title: 'Resultados del Torneo Deportivo UNIS',
    banner: commonBanner,
    type: 'Deportes',
    date: 'Publicado: 15 de noviembre',
    body: 'Revisa la tabla final de posiciones y los ganadores del torneo de fútbol y básquetbol interuniversitario 2025.',
  },
  {
    title: 'Nuevo Protocolo de Seguridad COVID-19',
    banner: commonBanner,
    type: 'Avisos',
    date: 'Efectivo: 1 de diciembre',
    body: 'La rectoría anuncia la actualización del protocolo de seguridad sanitaria en todas las instalaciones universitarias.',
  },
];

// 4. Modifica el componente principal Home
export default function Home() {
  return (
    <div className="bg-app-white">
      <Navbar></Navbar>
      <Hero></Hero>
      <div className="min-h-screen p-8 bg-gray-50">
        {/* Título de la Sección */}
        <Animate>
          <h1 className="text-4xl font-bold mb-12 text-center text-[#79170f]">
            Últimas noticias
          </h1>
        </Animate>
        {/* Contenedor del Grid */}
        <div className="max-w-15xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 align-items-center justify-items-center">
            {newsItems.map((note, index) => (
              <React.Fragment key={index}>
                <Animate>
                  <NoteTemplate note={note} />
                </Animate>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
