import React, { useState, useEffect, JSX } from 'react';
import { IoIosHelp } from 'react-icons/io';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import cn from '../cn';

interface TourProps {
  steps: Step[];
  storageKey?: string;
  startOnLoad?: boolean;
  continuous?: boolean;
  run?: boolean;
  help?: boolean;
  setRun?: React.Dispatch<React.SetStateAction<boolean>>;
  customClassName?: string;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'block'
    | 'custom';
}
export default function Tour({
  steps,
  storageKey = 'seenTour',
  startOnLoad = true,
  continuous = true,
  run: externalRun,
  setRun: externalSetRun,
  position = 'top-right',
  customClassName,
  help = true
}: TourProps): JSX.Element | null {
  const [internalRun, setInternalRun] = useState(false);

  const run = externalRun !== undefined ? externalRun : internalRun;
  const setRun = externalSetRun ?? setInternalRun;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!startOnLoad) return;
    if (typeof window === 'undefined') return;

    const seen = localStorage.getItem(storageKey);
    if (!seen) setRun(true);
  }, [mounted, storageKey, startOnLoad, setRun]);

  if (!mounted) return null; 

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem(storageKey, 'true');
      setRun(false);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-14 left-5';
      case 'top-right':
        return 'top-[57px] right-5';
      case 'bottom-left':
        return 'bottom-5 left-5';
      case 'bottom-right':
        return 'bottom-5 right-5';
      case 'block':
        return 'flex relative';
      case 'custom':
        return customClassName ?? '';
      default:
        return 'bottom-5 right-5';
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        continuous={continuous}
        showSkipButton
        run={run}
        callback={handleCallback}
        locale={{
          back: 'Atrás',
          close: 'Cerrar',
          last: 'Finalizar',
          next: 'Siguiente',
          skip: 'Saltar'
        }}
        styles={{
          options: {
            zIndex: 100000,
            primaryColor: '#012957',
            overlayColor: 'rgba(0, 0, 0, 0.5)'
          },
          tooltip: {
            fontFamily: '"Jaldi", sans-serif'
          }
        }}
      />
      {help && (
        <button
          onClick={() => setRun(true)}
          className={cn(
            'absolute z-50 flex h-[30px] w-[30px] items-center justify-center',
            'cursor-pointer rounded-full border border-preslow-gray p-0',
            'bg-transparent text-preslow-gray hover:text-preslow-gray',
            getPositionClasses()
          )}
        >
          <IoIosHelp className='w-full text-9xl' />
        </button>
      )}
    </>
  );
}
