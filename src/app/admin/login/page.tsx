'use client';
import { ControlButton } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';

export default function Login() {
  return (
    <div className="bg-app-white w-screen h-screen relative">
      <section
        className={cn(
          'mx-auto my-auto w-11/12 md:w1/2 lg:w-1/3 rounded-lg',
          'border border-solid border-gray-200 px-5 py-6',
          'flex gap-7 flex-col bg-white'
        )}
      >
        <Input change={() => {}} label="Usuario" name="hola"></Input>
        <Input
          change={() => {}}
          label="Contraseña"
          name="hola"
          type="password"
        ></Input>
        <ControlButton label="Login" type="primary" />
      </section>
      <Waves />
    </div>
  );
}

function Waves() {
  return (
    <div className={cn('w-screen bg-app-white absolute bottom-0 overflow-hidden')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="421"
        viewBox="0 0 1440 421"
        fill="none"
      >
        <g clipPath="url(#clip0_163_451)">
          <path
            d="M0 94.1698L60 80.0926C120 66.5417 240 37.5979 360 66.147C480 94.1698 600 178.37 720 220.47C840 262.57 960 262.57 1080 241.52C1200 220.47 1320 178.37 1380 157.32L1440 136.27V346.77H1380C1320 346.77 1200 346.77 1080 346.77C960 346.77 840 346.77 720 346.77C600 346.77 480 346.77 360 346.77C240 346.77 120 346.77 60 346.77H0V94.1698Z"
            fill="#77A5C2"
          />
          <path
            d="M0 182.4L60 168.323C120 154.772 240 125.828 360 154.377C480 182.4 600 266.6 720 308.7C840 350.8 960 350.8 1080 329.75C1200 308.7 1320 266.6 1380 245.55L1440 224.5V435H1380C1320 435 1200 435 1080 435C960 435 840 435 720 435C600 435 480 435 360 435C240 435 120 435 60 435H0V182.4Z"
            fill="#295A78"
          />
        </g>
        <defs>
          <clipPath id="clip0_163_451">
            <rect width="1440" height="421" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
