import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../frontend/component/Hero';

const Recipes = props => (
  <Fragment>
    <Head>
      <title>Recipes</title>
    </Head>
    <Hero
      title="Get Inspired!"
      subtitle="Explore all the recipes our community has shared"
    />
  </Fragment>
);

export default Recipes;
