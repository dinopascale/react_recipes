import Link from 'next/link';
import Layout from '../frontend/hoc/Layout';

const Recipes = props => (
  <Layout title="Recipes">
    <h1>All Recipes</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
  </Layout>
);

export default Recipes;
