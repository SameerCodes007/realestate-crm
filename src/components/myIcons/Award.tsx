import { lazy, Suspense } from 'react';

const AwardIcon = lazy(() => import('lucide-react/dist/esm/icons/award'));

export const Award = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <AwardIcon {...props} />
  </Suspense>
);