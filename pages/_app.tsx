import type { AppProps } from 'next/app'
import "styles/globals.css"
import instrumentSans from 'fonts/instrument_sans.font'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={instrumentSans.variable + " root"}>
            <Head>
                <title>Devlinks</title>
                <link rel="shortcut icon" href="/icons/logo-devlinks-small.svg" type="image/x-icon" />
            </Head>

            <Component {...pageProps} />
        </div>
    )
}
