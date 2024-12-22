import { lazy, Suspense } from 'react';

const UploadIcon = lazy(() => import('lucide-react/dist/esm/icons/upload'));

export const Upload = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <UploadIcon {...props} />
  </Suspense>
);