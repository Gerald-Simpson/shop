import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './_components/navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'drawingwithspecs',
  description: 'Built by Gerald Simpson',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-col w-view items-center'>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
