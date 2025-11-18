import Hero from '@/components/home/hero';
import cn from '@/utils/cn';

"use client";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <h2
        className={cn(
          'text-app-burgundy-900 text-4xl font-jaldi',
          'text-center font-semibold mt-44 mb-10'
        )}
      >
        Últimas Noticias
      </h2>
    </>
  );
}
