'use client';
import cn from '@/utils/cn';

export default function Hero() {
  return (
    <header className="relative">
      <section
        className={cn(
          'w-screen h-[80vh] flex flex-col itemscenter justify-center overflow-x-hidden',
          'bg-gradient-to-b from-app-soft-white to-app-blue-600'
        )}
      >
        <Circle />
        <Legend />

        <div className="h-10"></div>

        <p className="text-app-gray-text text-base md:text-lg xl:text-3xl z-20 text-left left-0 w-2/3 ml-10">
          Noticias y eventos de la Universidad de la Sierra Sur. <br />
          Un espacio digital para mantenerte al día con la vida universitaria,
          la ciencia y la ciencia y la cultura en la UNSIS.
        </p>

        <div></div>
      </section>
      {/* <div className="absolute w-full top-[80vh] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="175"
          viewBox="0 0 100vw 172"
          fill="none"
        >
          <path
            d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
            fill="#77A5C2"
          />
        </svg>
      </div> */}
      <Waves />

      <div className="my-44 w-1"></div>
    </header>
  );
}

import { motion } from 'framer-motion';

function Waves() {
  return (
    <div className="absolute w-screen top-[80vh] z-10 overflow-hidden">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2880 172"
        preserveAspectRatio="none"
        className="w-[210vw] h-[175px]"
        initial={{ x: 0 }}
        animate={{ x: ['0vw', '-100vw'] }}
        transition={{
          ease: 'linear',
          duration: 8,
          repeat: Infinity,
        }}
      >
        {/* Path 1 */}
        <path
          d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
          fill="#77A5C2"
        />

        {/* Path 2 (duplicado para loop infinito) */}
        <path
          d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
          fill="#77A5C2"
          transform="translate(1375, 0)"
        />
      </motion.svg>
    </div>
  );
}

function _Waves() {
  return (
    <div className="absolute w-screen top-[80vh] z-10 overflow-hidden">
      {/* SVG de 2 anchos: viewBox 2880 para contener 2 paths de 1440 cada uno */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2880 172" // <-- doble ancho
        preserveAspectRatio="none"
        className="w-[200vw] h-[175px] block"
        initial={{ x: '0vw' }}
        animate={{ x: ['0vw', '-100vw'] }} // se mueve exactamente 1 viewport (100vw)
        transition={{
          ease: 'linear',
          duration: 8,
          repeat: Infinity,
        }}
      >
        {/* Primera copia en x=0 */}
        <g transform="translate(0,0)">
          <path
            // Le damos un pequeño scaleY para incrementar la "altura" de la curva
            transform="translate(0,-6) scale(1,1.08)"
            d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
            fill="#77A5C2"
          />
        </g>

        {/* Segunda copia pegada a la derecha (x = 1440 dentro del viewBox de 2880) */}
        <g transform="translate(1440,0)">
          <path
            transform="translate(0,-6) scale(1,1.08)"
            d="M677.235 125.566C338.718 20.5079 84.0295 65.9611 -1 101.82V0H1440V71.238C1326.79 133.122 1015.75 230.624 677.235 125.566Z"
            fill="#77A5C2"
          />
        </g>
      </motion.svg>
    </div>
  );
}

function Circle() {
  return (
    <div className="absolute right-0 h-full z-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="577"
        height="725"
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

function Legend() {
  return (
    <section className="z-20 font-karma">
      <h1 className="text-7xl text-center text-app-blue-900">
        Universidad de la Sierra Sur
      </h1>
      <div className="h-8"></div>
      <h3 className="text-4xl text-center text-app-blue-900">
        Miahuatlán de Porfirio Días
      </h3>
    </section>
  );
}
