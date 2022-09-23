import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { Header } from '../components/Header';

import '../styles/global.scss';

interface MyAppProps extends AppProps {
  pageProps: {
    session: Session;
  }
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: MyAppProps) {
  return(
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
