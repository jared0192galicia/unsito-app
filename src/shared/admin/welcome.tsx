'use client';

import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <motion.div
      className='flex w-12 items-center justify-center text-4xl h-full'
      style={{ transformOrigin: '70% 70%' }}
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0] // secuencia del saludo
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      👋
    </motion.div>
  );
}
