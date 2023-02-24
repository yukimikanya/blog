import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <div className="font-quicksand">
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;