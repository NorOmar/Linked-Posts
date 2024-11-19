"use client"
import React from 'react'
import './globals.css'
import Navbar from './_Component/navbar/page'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from 'react-hot-toast';

export default function Rootlayout( { children }:any ) {
  return (
    <>
      <html>
        <Provider store={store}>
          <body>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <Navbar />
                {children}
                <Toaster />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </body>
        </Provider>
      </html>
    </>
  )
}
