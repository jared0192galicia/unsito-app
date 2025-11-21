"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

// Importa la configuración (si creaste el archivo src/config/firebase.ts)
// Si no creaste el archivo, pega la constante firebaseConfig aquí.
const firebaseConfig = { 
    apiKey: "AIzaSyDtx5kdKQEc7-PzO3Eqyi08l58sA5v63fw",
    authDomain: "unsito-a7388.firebaseapp.com",
    projectId: "unsito-a7388",
    storageBucket: "unsito-a7388.firebasestorage.app",
    messagingSenderId: "310047538800",
    appId: "1:310047538800:web:60e5a5b6cf4042df403eb5",
    measurementId: "G-MZRRNFBNGS"
};

// Variable para almacenar la instancia de Analytics
let analyticsInstance: any = null;

export default function FirebaseAnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. Inicialización de Firebase
    useEffect(() => {
        const initFirebase = async () => {
            // Verifica si Analytics es compatible con el navegador (necesario para IE/Safari)
            const isAnalyticsSupported = await isSupported();
            
            if (isAnalyticsSupported && !analyticsInstance) {
                try {
                    const app = initializeApp(firebaseConfig);
                    analyticsInstance = getAnalytics(app);
                    console.log("Firebase Analytics inicializado.");
                } catch (err) {
                    console.error("Error al inicializar Firebase Analytics:", err);
                }
            }
        };

        if (typeof window !== 'undefined') {
             initFirebase();
        }
    }, []);

    // 2. Seguimiento de vistas de página (Page Views)
    useEffect(() => {
        // Ejecuta solo si ya tenemos la instancia de analytics
        if (analyticsInstance) {
            const url = pathname + searchParams.toString();
            
            // Envía el evento de vista de página
            logEvent(analyticsInstance, 'page_view', {
                page_path: url,
                page_title: document.title,
            });
            console.log('GA4 PageView logged:', url);
        }
    }, [pathname, searchParams]); // Se dispara cada vez que la ruta cambia

    return null; // No renderiza nada visual
}