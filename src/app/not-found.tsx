'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import '@styles/notFound.css';
import cn from '@/utils/cn';

export default function NotFoundPage() {
  return (
    <div
      className={cn(
        'relative min-h-screen flex flex-col',
        'bg-gradient-to-l from-app-blue-700 to-app-blue-900',
        'items-center justify-center overflow-hidden'
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-2xl max-w-md text-center pl-20 text-app-white absolute z-50 top-44"
      >
        Parece que esta página se fue por un cafecito universitario ☕…
        <br />
        <Link
          href="/"
          className={cn(
            'hover:shadow-md hover:shadow-cyan-600',
            'transition-all duration-300 font-medium p-5', 'underline'
          )}
        >
          Pero puedes volver al inicio.
        </Link>
      </motion.p>
      <div className="container">
        <div className="tree"></div>
        <div className="table-container">
          <div className="table">
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="file-one">
              <div className="staple"></div>
            </div>
            <div className="file-two">
              <div className="staple"></div>
            </div>
            <div className="monitor">
              <div className="support"></div>
              <div className="screen">
                <div className="green"></div>
                <div className="red"></div>
              </div>
            </div>
            <div className="dairy"></div>
          </div>
        </div>
        <div className="chair">
          <div className="support"></div>
          <div className="sit"></div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-7xl font-bold mb-4 drop-shadow-lg absolute"
          >
            404
          </motion.h1>
          <div className="curve"></div>

          <div className="middle"></div>
          <div className="bottom"></div>
          <div className="wheel-top"></div>
          <div className="wheels">
            <div className="wheel"></div>
            <div className="wheel"></div>
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
        </div>
        <div className="water"></div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      ></motion.div> */}
    </div>
  );
}
