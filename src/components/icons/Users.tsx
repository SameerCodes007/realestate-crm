import { lazy, Suspense } from 'react';

const UsersIcon = lazy(() => import('lucide-react/dist/esm/icons/users'));

export const Users = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <UsersIcon {...props} />
  </Suspense>
);