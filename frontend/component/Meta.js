import Head from 'next/head';

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans"
        rel="stylesheet"
      />
      <link
        rel="shortcut icon"
        href="/static/favicon.ico"
        type="image/x-icon"
      />
    </Head>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      body {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }

      body {
        margin: 0;
      }

      h1,
      h2,
      h3 {
        font-family: 'Fredoka One', cursive;
      }

      h4,
      h5,
      h6 {
        font-family: 'Open Sans', sans-serif;
      }
    `}</style>
  </div>
);
