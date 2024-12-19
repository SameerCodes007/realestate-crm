import { lazy, Suspense } from 'react';

// Lazy load each icon component
const ArrowRightIcon = lazy(() => import('lucide-react/dist/esm/icons/arrow-right'));
const BathIcon = lazy(() => import('lucide-react/dist/esm/icons/bath'));
const BedIcon = lazy(() => import('lucide-react/dist/esm/icons/bed'));
const Building2Icon = lazy(() => import('lucide-react/dist/esm/icons/building-2'));
const CheckCircleIcon = lazy(() => import('lucide-react/dist/esm/icons/check-circle'));
const ClockIcon = lazy(() => import('lucide-react/dist/esm/icons/clock'));
const ConstructionIcon = lazy(() => import('lucide-react/dist/esm/icons/construction'));
const DownloadIcon = lazy(() => import('lucide-react/dist/esm/icons/download'));
const FacebookIcon = lazy(() => import('lucide-react/dist/esm/icons/facebook'));
const HomeIcon = lazy(() => import('lucide-react/dist/esm/icons/home'));
const InstagramIcon = lazy(() => import('lucide-react/dist/esm/icons/instagram'));
const KeyIcon = lazy(() => import('lucide-react/dist/esm/icons/key'));
const LinkedinIcon = lazy(() => import('lucide-react/dist/esm/icons/linkedin'));
const MailIcon = lazy(() => import('lucide-react/dist/esm/icons/mail'));
const MapPinIcon = lazy(() => import('lucide-react/dist/esm/icons/map-pin'));
const MenuIcon = lazy(() => import('lucide-react/dist/esm/icons/menu'));
const Paintbrush2Icon = lazy(() => import('lucide-react/dist/esm/icons/paintbrush-2'));
const PhoneIcon = lazy(() => import('lucide-react/dist/esm/icons/phone'));
const SendIcon = lazy(() => import('lucide-react/dist/esm/icons/send'));
const SquareIcon = lazy(() => import('lucide-react/dist/esm/icons/square'));
const TwitterIcon = lazy(() => import('lucide-react/dist/esm/icons/twitter'));
const XIcon = lazy(() => import('lucide-react/dist/esm/icons/x'));

// Create wrapper components with Suspense
export const ArrowRight = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <ArrowRightIcon {...props} />
  </Suspense>
);

export const Bath = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <BathIcon {...props} />
  </Suspense>
);

export const Bed = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <BedIcon {...props} />
  </Suspense>
);

export const Building2 = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <Building2Icon {...props} />
  </Suspense>
);

export const CheckCircle = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <CheckCircleIcon {...props} />
  </Suspense>
);

export const Clock = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <ClockIcon {...props} />
  </Suspense>
);

export const Construction = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <ConstructionIcon {...props} />
  </Suspense>
);

export const Download = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <DownloadIcon {...props} />
  </Suspense>
);

export const Facebook = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <FacebookIcon {...props} />
  </Suspense>
);

export const Home = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <HomeIcon {...props} />
  </Suspense>
);

export const Instagram = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <InstagramIcon {...props} />
  </Suspense>
);

export const Key = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <KeyIcon {...props} />
  </Suspense>
);

export const Linkedin = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <LinkedinIcon {...props} />
  </Suspense>
);

export const Mail = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <MailIcon {...props} />
  </Suspense>
);

export const MapPin = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <MapPinIcon {...props} />
  </Suspense>
);

export const Menu = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <MenuIcon {...props} />
  </Suspense>
);

export const Paintbrush2 = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <Paintbrush2Icon {...props} />
  </Suspense>
);

export const Phone = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <PhoneIcon {...props} />
  </Suspense>
);

export const Send = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <SendIcon {...props} />
  </Suspense>
);

export const Square = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <SquareIcon {...props} />
  </Suspense>
);

export const Twitter = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <TwitterIcon {...props} />
  </Suspense>
);

export const X = (props: any) => (
  <Suspense fallback={<div className="w-6 h-6" />}>
    <XIcon {...props} />
  </Suspense>
);