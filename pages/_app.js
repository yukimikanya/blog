import '@/styles/globals.css';
import { createLogger } from '@vercel/analytics';

function MyApp({ Component, pageProps }) {
  const logger = createLogger({
    // オプションを指定することができます
  });

  logger.page();

  return (
    <div className="font-quicksand">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;