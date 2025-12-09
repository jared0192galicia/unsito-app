// src/shared/GoogleAnalytics.tsx
"use client";

import { useEffect } from 'react';
// Importamos hooks de navegación para detectar cambios de ruta en la SPA
import { usePathname, useSearchParams } from 'next/navigation';

// ¡REEMPLAZA ESTA LÍNEA con tu ID de Medición de GA4!
const GA_MEASUREMENT_ID = 'G-MZRRNFBNGS'; 

// Declara gtag en el ámbito global para que TypeScript lo reconozca
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useEffect 1: Inyectar el script de GA4 una sola vez al cargar
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || (window as any).gtag) return;

    // Script principal de carga de gtag
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Script de inicialización y configuración
    const scriptInit = document.createElement('script');
    scriptInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(scriptInit);
  }, []);

  // useEffect 2: Enviar el evento de vista de página en cada cambio de ruta
  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
        const url = pathname + searchParams.toString();
        
        // Envía el evento de vista de página (page_view)
        window.gtag('event', 'page_view', {
            page_path: url,
            page_title: document.title,
        });
        // Opcional: Para depuración
        console.log('GA4 PageView:', url); 
    }
  }, [pathname, searchParams]);

  return null; // El componente no debe renderizar nada visible
}