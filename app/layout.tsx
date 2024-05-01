import './globals.css';
import GlobalContextProvider from '../stateProvider.tsx';
import { space, inter } from './fonts';

export const metadata = {
  title: 'Coffee Shop',
  description: 'Built by Gerald Simpson',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={space.className}>
      <body>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
