import AuthContext from '@/components/auth/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '600']
});

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="referrer" content="no-referrer" />
        </head>
        <body className={poppins.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthContext>
  );
}
