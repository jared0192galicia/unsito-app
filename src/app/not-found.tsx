'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: '#d1c1dc',
          fontFamily: 'sans-serif',
        }}
      >
        {/* container */}
        <div
          className="absolute left-0 top-0"
          style={{
            padding: '20px',
            position: 'relative',
            minWidth: '500px',
            minHeight: '500px',
            background: '#d1c1dc',
          }}
        >
          {/* TABLE */}
          <div className="absolute" style={{ left: '300px', bottom: '10px' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  backgroundColor: '#bf7f56',
                  width: '250px',
                  height: '250px',
                  position: 'absolute',
                  bottom: 0,
                }}
              ></div>

              <div
                style={{
                  background: '#d8976e',
                  height: '25px',
                  width: '350px',
                  position: 'absolute',
                  bottom: '250px',
                  left: '-25px',
                }}
              ></div>

              {/* Files */}
              <div
                style={{
                  background: '#5fb0c4',
                  height: '20px',
                  width: '100px',
                  bottom: '275px',
                  position: 'absolute',
                  animation: 'fileone 2s ease-in forwards',
                }}
              >
                <div
                  style={{
                    background: '#9cd4e4',
                    height: '9px',
                    width: '10px',
                    top: '6px',
                    position: 'absolute',
                    left: '10px',
                  }}
                ></div>
              </div>

              <div
                style={{
                  background: '#f86e6a',
                  height: '20px',
                  width: '90px',
                  bottom: '295px',
                  position: 'absolute',
                  left: '5px',
                  animation: 'fileone 2.5s ease-in forwards',
                  animationDelay: '0.3s',
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    background: '#efa8a7',
                    height: '9px',
                    width: '15px',
                    top: '6px',
                    position: 'absolute',
                    left: '10px',
                  }}
                ></div>
              </div>

              {/* Monitor */}
              <div style={{}}>
                <div
                  style={{
                    height: '70px',
                    width: '40px',
                    borderLeft: '8px solid #a8a1a2',
                    borderBottom: '8px solid #a8a1a2',
                    left: '130px',
                    position: 'absolute',
                    bottom: '275px',
                  }}
                ></div>

                <div
                  className="screen"
                  style={{
                    height: '130px',
                    width: '15px',
                    left: '138px',
                    position: 'absolute',
                    bottom: '305px',
                    backgroundColor: '#7c7676',
                  }}
                >
                  <div
                    style={{
                      height: '9px',
                      width: '4px',
                      background: 'green',
                      borderRadius: '2px',
                      position: 'absolute',
                      bottom: '15px',
                      left: '5px',
                    }}
                  ></div>

                  <div
                    style={{
                      height: '4px',
                      width: '4px',
                      background: 'red',
                      borderRadius: '2px',
                      position: 'absolute',
                      bottom: '7px',
                      left: '5px',
                    }}
                  ></div>
                </div>
              </div>

              {/* Dairy */}
              <div
                style={{
                  backgroundColor: '#a8a1a2',
                  height: '5px',
                  width: '60px',
                  position: 'absolute',
                  bottom: '275px',
                  left: '230px',
                }}
              ></div>
            </div>
          </div>

          {/* CHAIR */}
          <div
            className="absolute"
            style={{
              left: '700px',
              bottom: 0,
              animation: 'chairAnimation 4s ease-in',
            }}
          >
            <div
              style={{
                height: '100px',
                width: '45px',
                background: '#97c398',
                borderRadius: '10px',
                left: '170px',
                position: 'relative',
                top: '35px',
                zIndex: 3,
              }}
            ></div>

            <div
              style={{
                height: '30px',
                width: '200px',
                background: '#97c398',
                borderRadius: '10px',
                top: '100px',
                position: 'relative',
                zIndex: 3,
              }}
            ></div>

            <div
              style={{
                backgroundColor: '#a8a1a2',
                height: '80px',
                width: '35px',
                left: '80px',
                position: 'relative',
              }}
            ></div>

            <div
              style={{
                backgroundColor: 'white',
                height: '40px',
                width: '15px',
                left: '90px',
                position: 'relative',
              }}
            ></div>

            <div
              style={{
                height: '20px',
                width: '120px',
                borderRadius: '10px',
                backgroundColor: '#a8a1a2',
                left: '35px',
                position: 'relative',
                zIndex: 3,
              }}
            ></div>

            <div
              style={{
                display: 'flex',
                left: '25px',
                position: 'relative',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '15px',
                    width: '15px',
                    borderRadius: '50%',
                    background: 'black',
                    margin: '0 10px',
                    position: 'relative',
                    top: '-2px',
                    zIndex: 1,
                  }}
                ></div>
              ))}
            </div>

            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                borderRight: '10px solid white',
                top: '-22px',
                position: 'relative',
                left: '88px',
                transform: 'rotate(40deg)',
                zIndex: 1,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* ----------- CONTENIDO 404 ----------- */}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-7xl font-bold mb-4 drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg max-w-md text-center text-app-white"
      >
        Parece que esta página se fue por un cafecito universitario ☕…
        <br />
        <span className="text-app-blue-600 font-semibold">
          Pero puedes volver al inicio.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link
          href="/"
          className="
            mt-6 px-6 py-3 bg-app-blue-700 
            rounded-xl shadow-md hover:bg-app-blue-600 
            transition-colors duration-300 font-medium
          "
        >
          Regresar al inicio
        </Link>
      </motion.div>
    </div>
  );
}
