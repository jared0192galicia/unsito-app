'use client'
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from '@/utils/cn';
import {
  useNotificationStore,
  Notification,
} from '@/context/useNotificationStore';

const VARIANT: Record<
  NonNullable<Notification['type']>,
  { accent: string; bg: string }
> = {
  success: { accent: '#71D79F', bg: 'bg-green-400/80' },
  error: { accent: '#F29797', bg: 'bg-red-300/80' },
  warning: { accent: '#FCD48E', bg: 'bg-yellow-200/80' },
  info: { accent: '#86BFFC', bg: 'bg-blue-400/80' },
  reminder: { accent: '#5ea7fa', bg: 'bg-blue-500/80' },
};

export default function Notifications() {
  const items = useNotificationStore((s) => s.items);

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-6 right-6 z-50',
        'flex w-[320px] flex-col-reverse gap-3 md:w-96',
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto"
          >
            <NotificationCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function NotificationCard({ item }: { item: Notification }) {
  const remove = useNotificationStore((s) => s.remove);
  const { id, title, description, duration, type } = item;
  const variant = VARIANT[type] ?? VARIANT.info;

  const timerRef = useRef<number | null>(null);
  const remainingRef = useRef<number | null>(null);
  const startAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (duration == null || duration <= 0) return;
    remainingRef.current = duration;
    startAtRef.current = Date.now();
    timerRef.current = window.setTimeout(() => remove(id), duration);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [id]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
      if (startAtRef.current != null && remainingRef.current != null) {
        const elapsed = Date.now() - startAtRef.current;
        remainingRef.current = Math.max(
          0,
          (remainingRef.current ?? 0) - elapsed,
        );
      }
    }
  };

  const handleMouseLeave = () => {
    if (!remainingRef.current || remainingRef.current <= 0) return;
    startAtRef.current = Date.now();
    timerRef.current = window.setTimeout(
      () => remove(id),
      remainingRef.current,
    );
  };

  return (
    <div
      role="status"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-lg border p-4 shadow-lg',
        'backdrop-blur-md',
        'app-green-400/80',
        'border-gray-300/85',
      )}
      style={{ boxShadow: '0 8px 20px rgba(15,23,42,0.06)' }}
    >
      {/* accent stripe */}
      <div
        aria-hidden
        style={{ backgroundColor: variant.accent }}
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-lg"
      />

      {/* close button */}
      <button
        onClick={() => remove(id)}
        aria-label="Cerrar notificación"
        className="absolute right-2 top-2 rounded-md p-1 transition-opacity hover:opacity-90"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6L18 18"
            stroke="#170139"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 18L18 6"
            stroke="#170139"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="ml-4 pl-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 md:text-base">
              {title}
            </h4>
            {description ? (
              <p className="mt-1 text-xs text-gray-500 md:text-sm">
                {description}
              </p>
            ) : null}
          </div>
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-medium text-white"
            style={{ backgroundColor: variant.accent }}
          >
            {type.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
