// src/shared/NoteTemplate.tsx
"use client"
import React from 'react';

interface NoteDetails {
    title: string;
    banner: string;
    type: string;
    date: string;
    body: string;
}

const NoteTemplate: React.FC<{ note: NoteDetails }> = ({ note }) => {
    return (
        // Contenedor principal de la Tarjeta
        // Estilos: Borde sutil, esquinas redondeadas, fondo blanco, y sombra para levantarla.
        <div className="max-w-2xl rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            
            {/* Imagen/Banner de la Noticia */}
            {/* Contenedor para hacer la imagen responsiva */}
            <div className="h-120 w-full overflow-hidden shadow-md shadow-gray-400">
                <img 
                    src={note.banner} 
                    alt={note.title} 
                    // Estilos: Cubre el contenedor y mantiene las proporciones
                    className="w-full h-full object-cover" 
                />
            </div>

            {/* Contenido de Texto */}
            <div className="p-10">
                
                {/* Metadatos (Tipo y Fecha) */}
                <div className="flex justify-between items-center mb-2">
                    {/* Etiqueta del Tipo (El fondo azul que se ve en la imagen) */}
                    <span className="text-s font-semibold px-3 py-1 rounded-full bg-[#77a5c2] text-[#0e3d5b]">
                        {note.type}
                    </span>
                    
                    {/* Fecha */}
                    <span className="text-sm text-gray-500">
                        {note.date}
                    </span>
                </div>

                {/* Título de la Noticia */}
                <h2 className="text-4xl font-semibold text-gray-800 mb-2 mt-8">
                    {note.title}
                </h2>

                {/* Cuerpo de la Noticia (Solo el extracto) */}
                {/* Estilos: Texto más pequeño y gris, con un límite de líneas opcional */}
                <p className="text-m text-gray-600 mb-4 mt-4 line-clamp-4">
                    {note.body}
                </p>

                {/* Enlace "Leer más" */}
                <a href="#" className="flex items-center text-sm font-semibold text-[#77a5c2] hover:text-[#5e8399] transition duration-150">
                    Leer más →
                </a>
            </div>
        </div>
    );
};

export default NoteTemplate;