import { lazy, Suspense } from 'react';

const LogOutIcon = lazy(() => import('lucide-react/dist/esm/icons/log-out'));

export const LogOut = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <LogOutIcon {...props} />
  </Suspense>
);