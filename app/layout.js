import './globals.css';
import { Inter } from 'next/font/google';
import GlobalContextProvider from '../stateProvider.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Coffee Shop',
  description: 'Built by Gerald Simpson',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
