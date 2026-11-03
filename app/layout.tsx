import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tasnimul Hasan — Software & Embedded Systems Portfolio',
  description:
    'Official engineering portfolio and interactive CV of Tasnimul Hasan, Computer Science & Engineering undergraduate at North South University specializing in Java OOP architecture, Web Platforms (BanglaGrantha, TurfDhaka), and ESP32 PID Autonomous Robotics.',
  openGraph: {
    title: 'Tasnimul Hasan — Software & Embedded Systems Portfolio',
    description:
      'Official engineering portfolio and interactive CV of Tasnimul Hasan, Computer Science & Engineering undergraduate at North South University specializing in Java OOP architecture, Web Platforms (BanglaGrantha, TurfDhaka), and ESP32 PID Autonomous Robotics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tasnimul Hasan — Software & Embedded Systems Portfolio',
    description:
      'Official engineering portfolio and interactive CV of Tasnimul Hasan, Computer Science & Engineering undergraduate at North South University.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#EEF2FF] text-[#0F172A] antialiased selection:bg-[#2563EB] selection:text-white overflow-x-hidden desktop-cursor-root"
      >
        {children}
      </body>
    </html>
  );
}
