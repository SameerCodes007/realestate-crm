import { lazy, Suspense } from 'react';

const PlusIcon = lazy(() => import('lucide-react/dist/esm/icons/plus'));

export const Plus = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <PlusIcon {...props} />
  </Suspense>
);