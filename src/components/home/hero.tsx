'use client';
import cn from '@/utils/cn';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {

  const scroller = () => window.scrollBy({top:600, behavior: 'smooth'});
  return (
    <header className="relative overflow-hidden">
      <section
        className={cn(
          'w-screen h-[60vh] flex flex-col justify-center overflow-x-hidden',
          'bg-gradient-to-b from-app-soft-white to-app-blue-600',
        )}
      >
        <Circle />
        <Legend />
        <div className="h-10"></div>
        <p className="text-app-gray-text text-base md:text-lg xl:text-3xl z-20 text-left left-0 w-2/3 ml-10">
          Noticias y eventos de la Universidad de la Sierra Sur. <br />
          Un espacio digital para mantenerte al día con la vida universitaria,
          la ciencia y la cultura en la UNSIS.
        </p>
      </section>
      <div className="absolute z-30 w-full flex justify-center">
        <div
          className={cn(
            'p-2 h-14 w-14 bg-app-blue-900 text-white rounded-full animate-pulse',
            'flex justify-center items-center',
          )}
          onClick={scroller}
        >
          <ArrowDown className="text-xl font-extrabold" />
        </div>
      </div>
      <Waves />
      <div className="my-44 w-1"></div>
    </header>
  );
}

function Legend() {
  return (
    <section className="z-20 font-karma">
      <h1 className="text-2xl md:text-6xl text-center text-app-blue-900">
        Universidad de la Sierra Sur
      </h1>
      <div className="h-8"></div>
      <h3 className="text-lg md:text-3xl text-center text-app-blue-900">
        Miahuatlán de Porfirio Díaz
      </h3>
    </section>
  );
}

function Circle() {
  return (
    <div className="absolute -right-20 sm:right-0 h-full z-20 -top-28 sm:top-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="477"
        height="625"
        viewBox="0 0 577 725"
        fill="none"
      >
        <ellipse
          cx="501.5"
          cy="225.5"
          rx="501.5"
          ry="499.5"
          fill="url(#paint0_linear_132_367)"
          fillOpacity="0.4"
        />
        <defs>
          <linearGradient
            id="paint0_linear_132_367"
            x1="501.5"
            y1="-274"
            x2="501.5"
            y2="725"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E8EFF3" />
            <stop offset="0.686758" stopColor="#77A5C2" />
            <stop offset="1" stopColor="#295A78" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Waves() {
  return (
    <div className="absolute w-screen top-[60vh] z-10 overflow-hidden">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2880 172"
        preserveAspectRatio="none"
        className="w-[210vw] h-[75px] sm:h-[100px] md:h-[175px]"
        initial={{ x: 0 }}
        animate={{ x: ['0vw', '-100vw'] }}
        transition={{
          ease: 'linear',
          duration: 8,
          repeat: Infinity,
        }}
      >
        <path
          d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
          fill="#77A5C2"
        />

        <path
          d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
          fill="#77A5C2"
          transform="translate(1375, 0)"
        />
      </motion.svg>
    </div>
  );
}
