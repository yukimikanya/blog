import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ゆきのブログ|貧困・障がい・ジェンダーでも自分らしく!</title>
          <meta name="description" content="貧困で障がい(精神)を持ち、トランスジェンダーな私が体験や経験、どうやって今を生きているのか現在のことを書いていきたいと思います。同じ思いをな人や、自分のこんな状況という人への共感や役に立つ情報を発信していきます。" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css"></link>
          
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-QMZE6HJQ5R"></script>
          <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QMZE6HJQ5R');
          `}}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
