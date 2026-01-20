import { ReactNode } from 'react';

export default function Label({ children }: { children: ReactNode }) {
  return (
    <div className='text-app-text-500 mt-[16px] mb-[10px] font-oxygen text-[18px] font-light'>
      {children}
    </div>
  );
}
