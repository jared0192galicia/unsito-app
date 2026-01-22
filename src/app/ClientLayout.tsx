'use client';

import { usePageVisit } from '@/hooks/usePageVisit';

export function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // usePageVisit();

  return <>{children}</>;
}
