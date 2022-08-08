
import {  useEffect } from 'react'

import '../styles/globals.css';
import Cookies from 'js-cookie';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import { lightTheme } from '../themes';
import { AuthProvider,  UiProvider } from '../context';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {  LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function MyApp({ Component, pageProps }: any) {

  useEffect(()=>{

    console.log("_app")

    console.log("Cookies", Cookies.get('token'))

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
