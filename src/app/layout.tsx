import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Space_Grotesk, Inter, Anton } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Ahmed Osman',
  description: 'The Professional Portfolio of Ahmed Osman',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('font-body antialiased pl-16', spaceGrotesk.variable, inter.variable, anton.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
