import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google'
import Layout from '../components/Layout';

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout fontVariable={poppins.variable}>
      <Component {...pageProps} />
    </Layout>
  );
}
