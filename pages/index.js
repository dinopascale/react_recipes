import fetch from 'isomorphic-unfetch';
import { Fragment } from 'react';
import Head from 'next/head';
import ErrorPage from './_error';

import Hero from '../frontend/component/Hero';
import RecipesList from '../frontend/component/RecipesList';

const Index = props => {
  const { error } = props;

  if (error) {
    return <ErrorPage statusCode={error.status} />;
  }

  return (
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
};

Index.getInitialProps = async ({ req }) => {
  try {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

    const res = await fetch(`${baseUrl}/api/recipes`);

    if (res.status !== 200) {
      const e = new Error(res.statusText);
      e.status = res.status;
      throw e;
    }

    const data = await res.json();

    return {
      recipes: data.results
    };
  } catch (e) {
    return { error: e };
  }
};

export default Index;
