import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './_components/navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Coffee Shop',
  description: 'Built by Gerald Simpson',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
