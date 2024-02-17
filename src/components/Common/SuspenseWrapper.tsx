import { ReactNode, Suspense } from 'react';

export const SuspenseWrapper = ({ children, fallback }: { children: ReactNode; fallback: ReactNode }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
