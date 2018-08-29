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
    if (req) {
      try {
        const { db } = req;
        const recipes = await db.models['Recipe']
          .find({ sharable: true })
          .limit(4)
          .populate('_creator', 'avatar username')
          .select(
            'name preparationTime cookTime difficulty _creator img tag rateCount rateValue'
          );

        const promises = recipes.map(async recipe => {
          const rates = await db.models['RecipeRate']
            .find({ recipeId: recipe._id })
            .select('value');
          const rateCount = rates.length;
          const rateValue =
            rates.length === 0
              ? 0
              : rates.reduce((sum, rate) => sum + rate.value, 0);
          return {
            ...recipe._doc,
            rateCount,
            rateValue
          };
        });

        return {
          recipes: await Promise.all(promises)
        };
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    const res = await fetch(`/api/recipes`);

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
