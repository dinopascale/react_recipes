import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { Fragment } from 'react';

import InfoRow from '../frontend/component/InfoRow';

const Recipe = props => (
  <Fragment>
    <Head>
      <title>{props.recipe.name || 'Fantastic Recipe'}</title>
    </Head>
    <div className="recipe-image--container">
      <img
        src={props.recipe.img}
        alt={props.recipe.name}
        className="recipe-image"
      />
    </div>
    <h1 className="recipe-title">{props.recipe.name}</h1>
    <h5 className="recipe-author">by {props.recipe._creator.username}</h5>
    <InfoRow infos={props.infos} />
    <style jsx>{`
      .recipe-image--container {
        margin-top: 30px;
      }

      .recipe-image {
        width: 100%;
        max-width: 600px;
      }

      .recipe-title {
        font-family: 'Fredoka One', cursive;
        font-size: 28px;
        text-align: center;
        margin-bottom: 16px;
        color: #ef476f;
      }

      .recipe-author {
        margin-top: 0;
        color: rgba(0, 0, 0, 0.3);
        text-align: center;
      }
    `}</style>
  </Fragment>
);

Recipe.getInitialProps = async props => {
  const baseUrl = props.req
    ? `${props.req.protocol}://${props.req.get('Host')}`
    : '';

  const res = await fetch(`${baseUrl}/api/recipe/${props.query.id}`);
  const data = await res.json();

  if (!data.recipe || data.recipe.length === 0) {
    props.res.redirect('/');
  }

  const { preparationTime, cookTime, difficulty, serves } = data.recipe;
  const infos = {
    'Preapartion Time': preparationTime + ' min',
    'Cook Time': cookTime + ' min',
    Difficulty: difficulty,
    Serves: serves
  };

  console.log(infos);

  return {
    recipe: data.recipe,
    infos
  };
};

export default withRouter(Recipe);
