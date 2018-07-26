import Link from 'next/link';
import Layout from '../frontend/hoc/Layout';

const Index = props => (
  <Layout title="Home">
    <h1>React Recipes</h1>
    <Link href="/recipes">
      <a>Recipes</a>
    </Link>
    <style jsx>
      {`
        h1,
        h2 {
          font-family: 'Fredoka One', cursive;
          font-size: 60px;
          letter-spacing: 2px;
        }

        p,
        a {
          font-family: 'Open Sans', sans-serif;
        }
      `}
    </style>
  </Layout>
);

export default Index;
