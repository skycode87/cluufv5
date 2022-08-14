
import {  useEffect } from 'react'

import '../styles/globals.css';
import Cookies from 'js-cookie';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { useRouter } from "next/router";

import { lightTheme } from '../themes';
import { AuthProvider,  UiProvider } from '../context';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {  LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(()=>{
    if(Cookies.get("token")){
     
    }else{
    // router.replace(`/auth/${Cookies.get("instance")}`);
    }
  },[])

  return (
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <UiProvider>
                <ThemeProvider theme={ lightTheme }>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </LocalizationProvider>
          </AuthProvider>
        </SWRConfig>
  )
}

export default MyApp
