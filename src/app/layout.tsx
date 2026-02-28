import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hilltop Media | Performance Creative Agency | Vancouver',
  description:
    'Vancouver performance creative agency. Branding, web design, video production, packaging, and paid advertising. We deliver outcomes, not just assets.',
  keywords: [
    'creative agency Vancouver',
    'branding agency Vancouver',
    'web design Vancouver',
    'performance creative agency',
    'Hilltop Media',
    'video production Vancouver',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
