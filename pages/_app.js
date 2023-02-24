import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="font-quicksand">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;