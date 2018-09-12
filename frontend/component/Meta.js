import Head from 'next/head';

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans"
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

      html {
        height: 100%;
      }

      #__next {
        height: 100%;
      }

      ${props.isScrollable
        ? `body {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        margin:0;
      }`
        : `body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin:0;
        }`} h1,
      h2,
      h3 {
        font-family: 'Montserrat', sans-serif;
      }

      h4,
      h5,
      h6,
      p {
        font-family: 'Open Sans', sans-serif;
      }
    `}</style>
  </div>
);
