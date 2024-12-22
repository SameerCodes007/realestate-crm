import { lazy, Suspense } from 'react';

const PencilIcon = lazy(() => import('lucide-react/dist/esm/icons/pencil'));

export const Pencil = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <PencilIcon {...props} />
  </Suspense>
);