import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import { withPasswordProtect } from '@storyofams/next-password-protect'

function App({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

// Before: export default App;
export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(App, {
    // Options go here (optional)
    loginApiUrl: '/api/login',
  })
  : App;