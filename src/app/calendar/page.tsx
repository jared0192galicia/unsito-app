
import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';


export default function CalendarPage() {
    return (
        // Contenedor principal para la página
        <div className="bg-app-white min-h-screen">

            {/* 1. BARRA DE NAVEGACIÓN */}
            <Navbar />

            {/* 2. CONTENIDO PRINCIPAL (El espacio donde iría el calendario) */}
            <main className="p-8 flex flex-col items-center">

                {/* Título */}
                <h1 className="text-4xl font-bold mb-8 text-[#79170f] text-center">
                    Calendario de Eventos
                </h1>

                {/* Contenedor del contenido vacío */}
                <div className="w-full max-w-4xl p-10 bg-white rounded-xl shadow-2xl text-center border-t-4 border-[#77a5c2]">
                    <p className="text-xl font-semibold text-gray-800">
                        Contenido Temporal de la Vista de Calendario
                    </p>
                    <p className="mt-3 text-md text-gray-500">
                        Aquí se irá el componente completo del calendario.
                    </p>
                </div>

            </main>

            {/* 3. PIE DE PÁGINA */}
            <Footer />

        </div>
    );
}