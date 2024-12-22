import { lazy, Suspense } from 'react';

const TrashIcon = lazy(() => import('lucide-react/dist/esm/icons/trash'));

export const Trash = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <TrashIcon {...props} />
  </Suspense>
);