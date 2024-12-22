import { lazy, Suspense } from 'react';

const MessageSquareIcon = lazy(() => import('lucide-react/dist/esm/icons/message-square'));

export const MessageSquare = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <MessageSquareIcon {...props} />
  </Suspense>
);