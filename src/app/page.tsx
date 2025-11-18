// src/app/page.tsx

// 1. IMPORTA TU TEMPLATE DE NOTA
import NoteTemplate from '../shared/noteTemplate'; 


// 2. Definición temporal de la interfaz
interface NoteDetails {
    title: string;
    banner: string; 
    type: string;
    date: string;
    body: string;
}

// 3. DATOS DE EJEMPLO (Con variaciones para simular las 4 tarjetas)
const commonBanner = 'https://www.unsis.edu.mx/web/sites/default/files/styles/wide/public/2025-09/XVII%20SEMANA%20CULTURAS%20SS%202025%20-pag.jpg?itok=YYFMWjjB';

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
        // Contenedor principal con fondo (bg-gray-50) y espaciado
        <div className="min-h-screen p-8 bg-gray-50">
            
            {/* Título de la Sección */}
            <h1 className="text-4xl font-bold mb-12 text-center text-[#79170f]">
                Últimas noticias
            </h1>
            
            {/* Contenedor del Grid */}
            <div className="max-w-15xl mx-auto">
                {/* Clases del Grid:
                  grid: Habilita el grid.
                  grid-cols-1: 1 columna por defecto (móvil).
                  sm:grid-cols-2: 2 columnas en pantallas pequeñas (>= 640px).
                  lg:grid-cols-4: 4 columnas en pantallas grandes (desktop).
                  gap-6: Espacio consistente entre las tarjetas.
                */}
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 align-items-center justify-items-center">
                    
                    {/* Mapeo del array de noticias para renderizar las tarjetas */}
                    {newsItems.map((note, index) => (
                        // Renderizamos directamente el NoteTemplate sin un div extra, 
                        // ya que el template ya tiene el estilo de tarjeta (shadow-lg, etc.)
                        <NoteTemplate 
                            key={index} // Se usa el índice como key, idealmente sería un ID único.
                            note={note} 
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}