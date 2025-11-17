"use client";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-10">
        {/* Contenido aquí */}
      </main>

      <Footer />
    </div>
  );
}
