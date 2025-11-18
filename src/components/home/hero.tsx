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
      <div className="absolute w-full top-[80vh] z-10">
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
      </div>

      <div className="my-44 w-1"></div>
    </header>
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
          fill-opacity="0.4"
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
            <stop stop-color="#E8EFF3" />
            <stop offset="0.686758" stop-color="#77A5C2" />
            <stop offset="1" stop-color="#295A78" />
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
