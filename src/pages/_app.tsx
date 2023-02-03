import '../lib/dayjs'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { Roboto } from '@next/font/google'
import { QueryClientProvider } from '@tanstack/react-query'

import { globalStyles } from '../styles/global'
import { queryClient } from '../lib/react-query'
import { DefaultSeo } from 'next-seo'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className={roboto.className}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt-BR',
          url: 'https://www.ignitecall.vercel.com/',
          siteName: 'Ignite Call',
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  )
}
