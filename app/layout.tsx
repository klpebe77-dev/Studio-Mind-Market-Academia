import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Studio-Mind Market Academia',
  description: 'A student-focused platform for academic productivity.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-zinc-950 text-white antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
