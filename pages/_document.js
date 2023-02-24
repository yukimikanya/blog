import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createLogger } from '@vercel/analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  componentDidMount() {
    const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const logger = createLogger(ANALYTICS_ID);
    logger.page();
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ゆきのブログ|貧困・障がい・ジェンダーでも自分らしく!</title>
          <meta name="description" content="貧困で障がい(精神)を持ち、トランスジェンダーな私が体験や経験、どうやって今を生きているのか現在のことを書いていきたいと思います。同じ思いをな人や、自分のこんな状況という人への共感や役に立つ情報を発信していきます。" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-QMZE6HJQ5R"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QMZE6HJQ5R');
            `
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
