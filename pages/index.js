import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { Fragment } from 'react';

import ErrorPage from './_error';
import ActionButton from '../frontend/shared/ActionButton';

const styleButton = {
  width: '100%',
  maxWidth: '300px',
  maxHeight: '36px',
  backgroundColor: '#ecf284',
  fontWeight: 'bold',
  lineHeight: '14px',
  marginBottom: '20px',
  borderRadius: '4px',
  cursor: 'pointer'
};

class Index extends React.Component {
  navigateToAuth = () => {
    this.props.router.push('/auth');
  };

  render() {
    const { error } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>Home</title>
        </Head>
        <div className="landing">
          <section className="title-action">
            <h1 className="title">React Recipes</h1>
            <h3 className="subtitle">
              Share your recipes. Get inspired.
              <br /> Cook!
            </h3>
            <ActionButton
              customStyle={styleButton}
              handleClick={this.navigateToAuth}
            >
              Enter
            </ActionButton>
            <ActionButton
              customStyle={styleButton}
              handleClick={this.navigateToAuth}
            >
              Register
            </ActionButton>
          </section>
        </div>
        <style jsx>{`
          .landing {
            height: 100%;
            position: relative;
          }

          .title-action {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            padding: 40px 30px;
            text-align: center;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
          }

          .title {
            font-size: 48px;
            margin: 10px 0;
            color: #fff;
          }

          .subtitle {
            font-size: 16px;
            font-weight: 200;
            font-family: 'Open Sans', sans-serif;
            color: #fff;
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 18px;
          }

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
  }
}

// Index.getInitialProps = async ({ req }) => {
//   try {
//     if (req) {
//       try {
//         const { db } = req;
//         const recipes = await db.models['Recipe']
//           .find({ sharable: true })
//           .limit(4)
//           .populate('_creator', 'avatar username')
//           .select(
//             'name preparationTime cookTime difficulty _creator img tag rateCount rateValue'
//           );

//         const promises = recipes.map(async recipe => {
//           const rates = await db.models['RecipeRate']
//             .find({ recipeId: recipe._id })
//             .select('value');
//           const rateCount = rates.length;
//           const rateValue =
//             rates.length === 0
//               ? 0
//               : rates.reduce((sum, rate) => sum + rate.value, 0);
//           return {
//             ...recipe._doc,
//             rateCount,
//             rateValue
//           };
//         });

//         return {
//           recipes: await Promise.all(promises)
//         };
//       } catch (e) {
//         console.log(e);
//         return e;
//       }
//     }

//     const res = await fetch(`/api/recipes`);

//     if (res.status !== 200) {
//       const e = new Error(res.statusText);
//       e.status = res.status;
//       throw e;
//     }

//     const data = await res.json();

//     return {
//       recipes: data.results
//     };
//   } catch (e) {
//     return { error: e };
//   }
// };

export default withRouter(Index);
