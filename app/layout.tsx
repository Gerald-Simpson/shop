import './globals.css';
import GlobalContextProvider from '../stateProvider.tsx';
import { space, inter } from './fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';

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
        <UserProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
