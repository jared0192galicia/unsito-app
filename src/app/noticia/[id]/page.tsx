// src/app/noticias/[id]/page.tsx

import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';

// Definición de la interfaz de props para capturar el ID de la URL
interface NoticiaPageProps {
  params: {
    id: string; 
  };
}

// Datos de la noticia (deberían venir de una llamada al servicio usando params.id)
const newsData = {
  title: 'XVII Semana de las Culturas de la Sierra Sur',
  banner: 'https://www.unsis.edu.mx/web/sites/default/files/styles/wide/public/2025-09/XVII%20SEMANA%20CULTURAS%20SS%202025%20-pag.jpg?itok=YYFMWjjB',
  type: 'Deportes', // Usamos Deportes, como se ve en la imagen original de la tarjeta
  date: 'Del 12 al 17 de octubre',
  body_intro: 'La Universidad de la Sierra Sur hace una cordial invitación a la comunidad universitaria y público en general a participar en las actividades de la XVII Semana de las Culturas de la Sierra Sur, que se celebrará del 12 al 17 de octubre de 2025.',
  body_detail: 'Durante esta edición, contaremos con la presencia de artesanos, investigadores, músicos y portadores de tradición de diversos municipios de la Sierra Sur, quienes compartirán sus saberes y expresiones artísticas a través de talleres, charlas y demostraciones en vivo. La Semana de las Culturas busca fortalecer el reconocimiento de nuestra identidad regional, promover el diálogo intercultural y brindar un espacio donde la comunidad pueda convivir, aprender y valorar la riqueza cultural que nos distingue. Te invitamos a formar parte de esta celebración y a disfrutar de un programa pensado para todas las edades. ¡Acompáñanos y vive la diversidad cultural que da vida a nuestra universidad y a nuestra región!',
};


export default function NoticiaPage({ params }: NoticiaPageProps) {
    const newsId = params.id;
    // console.log("ID de la noticia:", newsId); // Para fines de depuración

    return (
        <div className="bg-app-white min-h-screen">
            <Navbar />
            
            {/* Contenedor principal centrado, similar al cuerpo de la imagen */}
            <main className="pt-10 pb-20 px-4 flex flex-col items-center">
                
                {/* Contenedor de la Noticia Completa (limitado a max-width) */}
                <article className="w-full max-w-5xl bg-white p-6 md:p-10">

                    {/* TÍTULO PRINCIPAL CENTRADO */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-[#79170f] text-center">
                        {newsData.title}
                    </h1>

                    {/* SECCIÓN DE IMAGEN Y TEXTO INTRODUCTORIO (Grid/Flex) */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        
                        {/* 1. Imagen (Incluyendo Metadatos) */}
                        <div className="relative">
                            <img 
                                src={newsData.banner} 
                                alt={newsData.title} 
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                            {/* Metadatos sobre la Imagen (Tipo y Fecha) */}
                            <div className="absolute top-4 left-4 flex gap-4 text-white font-semibold">
                                {/* Tipo (Etiqueta azul/gris) */}
                                <span className="bg-[#77a5c2] px-3 py-1 text-sm rounded-full">
                                    {newsData.type}
                                </span>
                                {/* Fecha */}
                                <span className="bg-black bg-opacity-50 px-3 py-1 text-sm rounded-full">
                                    {newsData.date}
                                </span>
                            </div>
                        </div>

                        {/* 2. Párrafo Introductorio (Lado derecho de la imagen) */}
                        <div className="flex flex-col justify-between">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {newsData.body_intro}
                            </p>
                            <p className="mt-4 text-base text-gray-600 italic">
                                Evento gratuito. Asiste y celebra nuestras culturas con música, danza, artesanías, conferencias, exposiciones y gastronomía de nuestra región.
                            </p>
                        </div>
                    </div>

                    {/* CUERPO PRINCIPAL DEL ARTÍCULO */}
                    <div className="mt-10 border-t border-gray-200 pt-8">
                        <p className="text-lg text-gray-800 leading-relaxed mb-6">
                            {newsData.body_detail}
                        </p>
                        
                        {/* ENLACE "CONSULTA MÁS INFORMACIÓN" */}
                        <p className="mt-8 text-md text-gray-600">
                            Consulta más información en <a href="#" className="text-[#79170f] font-semibold hover:underline">aquí</a>.
                        </p>
                    </div>
                    
                </article>
                
            </main>
            
            <Footer />
        </div>
    );
}