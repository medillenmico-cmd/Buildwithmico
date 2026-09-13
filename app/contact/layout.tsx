import type { Metadata } from 'next';

const title = 'Contact | BuildWithMico';
const description =
  'Tell Mico about the website, funnel, CRM, automation, or booking system you want to build.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/contact',
    siteName: 'BuildWithMico',
    title,
    description,
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
