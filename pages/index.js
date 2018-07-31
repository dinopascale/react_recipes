import fetch from 'isomorphic-unfetch';
import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../frontend/component/Hero';
import RecipesList from '../frontend/component/RecipesList';

const Index = props => (
  <Fragment>
    <Head>
      <title>Home</title>
    </Head>
    <Hero
      title="React Recipes"
      subtitle="Share your Recipes, Get inspired by others, Cook!"
      ctaLink="/recipes"
      ctaTitle="Start"
    />
    <section className="most-recent">
      <h4>Most Recents</h4>
      <RecipesList recipes={props.recipes} />
    </section>
    <style jsx>{`
      .most-recent {
        width: 100%;
        padding: 50px 25px 0 25px;
        box-sizing: border-box;
      }

      .most-recent h4 {
        font-size: 20px;
        margin-bottom: 20px;
        color: rgba(0, 0, 0, 0.7);
      }
    `}</style>
  </Fragment>
);

Index.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

  const res = await fetch(`${baseUrl}/api/recipes`);
  const data = await res.json();

  return {
    recipes: data.results
  };
};

export default Index;
