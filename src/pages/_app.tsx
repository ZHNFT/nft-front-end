import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification'

//import { isAuth, setUserAuth } from '../utils/Authentication';
import { useWallet } from '@solana/wallet-adapter-react';

import 'bootstrap/dist/css/bootstrap.css';
require('@solana/wallet-adapter-react-ui/styles.css');
import "@fortawesome/fontawesome-svg-core/styles.css";
require('../styles/globals.css');

import { config } from "@fortawesome/fontawesome-svg-core";
import { isAuth } from 'utils/Authentication';
import { useRouter } from 'next/router';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


const App: FC<AppProps> = ({ Component, pageProps }) => {

  const router = useRouter();

  let loading = false
  if(router.pathname === "/register") {
    loading = false
  } else {
    loading = true
  }

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    
  }, []);


    return (
        <>
          <Head>
            <title>BluChip</title>
          </Head>

          <ContextProvider>
              <Notifications />
              {loading ?
              <AppBar/> : null
              }
              <ContentContainer>
                <Component {...pageProps} />
              </ContentContainer>
              {loading ?
              <Footer/> : null
              }
              
          </ContextProvider>
        </>
    );
};

export default App;
