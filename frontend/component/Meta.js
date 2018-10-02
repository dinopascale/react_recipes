import Head from 'next/head';

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,900"
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
        font-family: 'Roboto', sans-serif;
      }

      html {
        height: 100%;
      }

      body {
        width: 100%;
        height: 100%;
        margin: 0;
        ${props.isScrollable ? 'overflow-x: hidden' : 'overflow: hidden'};
      }

      #__next {
        height: 100%;
      }

      h1,
      h2 {
        font-weight: 300;
      }

      h3,
      h4,
      h5,
      .subtitle-one,
      .body-one,
      .body-two,
      .caption,
      .overline {
        font-weight: 400;
      }

      h6,
      .subtitle-two,
      .button-text {
        font-weight: 500;
      }

      h1 {
        font-size: 96px;
        letter-spacing: -0;
      }

      h2 {
        font-size: 60px;
        letter-spacing: -0.03125rem;
      }

      h3 {
        font-size: 48px;
        letter-spacing: 0;
      }

      h4 {
        font-size: 34px;
        letter-spacing: 0.015625rem;
      }

      h5 {
        font-size: 24px;
        letter-spacing: 0;
      }

      h6 {
        font-size: 20px;
        letter-spacing: 0.009375rem;
      }

      .subtitle-one,
      .body-one {
        font-size: 16px;
      }

      .subtitle-one {
        letter-spacing: 0.009375rem;
      }

      .body-one {
        letter-spacing: 0.03125rem;
      }

      .subtitle-two,
      .body-two,
      .button-text {
        font-size: 14px;
      }

      .subtitle-two {
        letter-spacing: 0.00625rem;
      }

      .body-two {
        letter-spacing: 0.015625rem;
      }

      .button-text {
        letter-spacing: 0.046875rem;
        text-transform: uppercase;
      }

      .caption {
        font-size: 12px;
        letter-spacing: 0.025rem;
      }

      .overline {
        font-size: 10px;
        letter-spacing: 0.09375rem;
      }
    `}</style>
  </div>
);
