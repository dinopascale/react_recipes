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
  navigateToLogin = () => {
    this.props.router.push('/auth/login');
  };

  navigateToRegister = () => {
    this.props.router.push('/auth/register');
  };

  render() {
    const { error } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>Home | React Recipes</title>
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
              handleClick={this.navigateToLogin}
            >
              Enter
            </ActionButton>
            <ActionButton
              customStyle={styleButton}
              handleClick={this.navigateToRegister}
            >
              Register
            </ActionButton>
          </section>
        </div>
        {/* <div className="explore">
          <p>... or just search for some recipes!</p>
        </div> */}
        <style jsx>{`
          .landing {
            // height: calc(100% - 60px);
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
            margin: 0 0 30px 0;
            padding: 15px 0;
            color: #fff;
            border-top: 6px solid;
            border-bottom: 6px solid;
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

          .explore {
            background: #10aeb2;
            height: 60px;
            bottom: 0;
            // transform: translateY(40px);
            transition: transform 0.3s 1s ease-in;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          @keyframes;
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
