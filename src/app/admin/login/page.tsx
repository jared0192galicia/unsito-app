'use client';
import { login } from '@/app/api/auth/login';
import { ControlButton } from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import cn from '@/utils/cn';
import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LoginForm = {
  user: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ password: '', user: '' });
  const router = useRouter();

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogin = async () => {
    if (await login(form.user, form.password)) {
      router.push('/admin/home');
    }
  };

  return (
    <div className="relative w-screen h-screen bg-app-white overflow-hidden flex">
      <div className="flex-1 flex items-center justify-center relative z-10">
        <section
          className={cn(
            'w-[350px] max-w-md rounded-xl bg-white',
            'border border-gray-200 shadow-md',
            'px-10 py-12 flex flex-col gap-7'
          )}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Iniciar Sesión
          </h2>

          <Input
            label="Usuario o correo"
            name="user"
            placeholder="ejemplo@gmail.com"
            icon={<User size={16} />}
            change={handleChange}
          />

          <div>
            <Input
              label="Contraseña"
              name="password"
              placeholder="Contraseña"
              type="password"
              icon={<Lock size={16} />}
              change={handleChange}
            />
            <span
              className={cn(
                'text-app-gray-text/40 text-sm',
                'cursor-pointer',
                'mt-2 hover:underline'
              )}
            >
              ¿Olvidaste tu Contraseña?
            </span>
          </div>
          <ControlButton label="Entrar" type="primary" onClick={handleLogin} />
        </section>
      </div>

      <div
        className={cn(
          'bg-gradient-to-b m-auto h-[70%] w-[1px] z-50',
          'from-app-blue-600/40 via-app-blue-900 to-app-blue-600/40'
        )}
      ></div>

      <div className="hidden md:flex flex-1 flex-col items-center justify-center pr-16 relative z-10">
        <h1 className="text-5xl font-serif text-[#1E3A54]">UNSITO</h1>
        <span className="text-2xl mt-2 text-[#1E3A54] opacity-80">
          Administración
          <div
            className={cn('bg-app-blue-600 m-auto w-full h-[1px] z-50')}
          ></div>
        </span>
      </div>

      <Waves />
    </div>
  );
}

function Waves() {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="auto"
        viewBox="0 0 1440 421"
        preserveAspectRatio="none"
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
