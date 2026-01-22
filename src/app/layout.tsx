import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css"; 
import "primereact/resources/primereact.min.css";              
import "primeicons/primeicons.css";                            
import Notifications from "@/shared/notifications";
import { ClientLayout } from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El chismuncito - Noticias de la Universidad de la Sierra Sur",
  description: "Mantente informado con las últimas noticias, eventos y actualizaciones de la Universidad de la Sierra Sur en El chismuncito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <ClientLayout>{children}</ClientLayout> */}
        <Notifications />
      </body>
    </html>
  );
}
