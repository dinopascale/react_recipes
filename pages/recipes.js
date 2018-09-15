import React, { Fragment } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import ActionButton from '../frontend/shared/ActionButton';
import GreetUser from '../frontend/component/GreetUser';
import RecipesList from '../frontend/component/RecipesList';

const styleButton = {
  maxWidth: '300px',
  maxHeight: '36px',
  backgroundColor: '#ecf284',
  fontWeight: 'bold',
  lineHeight: '14px',
  marginBottom: '20px',
  borderRadius: '4px',
  padding: '10px 40px',
  cursor: 'pointer'
};

class Recipes extends React.Component {
  static async getInitialProps({ req }) {
    try {
      if (req) {
        try {
          const { db } = req;
          const recipes = await db.models['Recipe']
            .find({ sharable: true })
            .limit(6)
            .populate('_creator', 'avatar username')
            .select(
              'name preparationTime cookTime difficulty _creator img tag createdAt'
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
              rateValue,
              avgRate: rateCount !== 0 ? +(rateValue / rateCount).toFixed(2) : 0
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

      const response = await fetch(`/api/recipes?num=6`);

      if (response.status !== 200) {
        const e = new Error(res.statusText);
        e.status = response.status;
        throw e;
      }
      const data = await response.json();
      return {
        recipes: data.results.map(recipe => {
          return {
            ...recipe,
            avgRate:
              recipe.rateCount !== 0
                ? +(recipe.rateValue / recipe.rateCount).toFixed(2)
                : 0
          };
        })
      };
    } catch (e) {
      return { error: e };
    }
  }

  componentDidMount() {
    this.props.router.prefetch('/auth/register');
  }

  renderCallToAction = () => {
    return (
      <div className="invite-container">
        <h1 className="title">Feel Inspired?</h1>
        <p className="subtitle">
          Why not register and post your awesome recipe?
        </p>
        <ActionButton
          customStyle={styleButton}
          handleClick={() => this.props.router.push('/auth/register')}
        >
          Enter
        </ActionButton>
        <style jsx>{`
          .invite-container {
            width: 100%;
          }

          .title,
          .subtitle {
            margin-top: 0;
            color: #fff;
          }

          .title {
            margin-bottom: 10px;
          }

          .subtitle {
            margin-bottom: 30px;
          }
        `}</style>
      </div>
    );
  };

  renderGreetToUser = () => {
    const { user } = this.props;
    return <GreetUser user={user} />;
  };

  render() {
    const { user, recipes } = this.props;
    console.log(recipes);
    return (
      <Fragment>
        <Head>
          <title>Recipes | React Recipes</title>
        </Head>
        <div className="recipes-container">
          {user ? this.renderGreetToUser() : this.renderCallToAction()}
          <hr className="divider" />
          <RecipesList recipes={recipes} />
          <style jsx>{`
            .recipes-container {
              width: 100%;
              min-height: 100%;
              padding: 90px 20px 40px 20px;
              overflow-y: scroll;
            }

            .divider {
              border: 1px solid;
              color: #fff;
              margin: 40px 0 20px 0;
            }
          `}</style>
        </div>
        {/*two different render about no user and registered user*/}
        {/*GridContainer with infinite scroll*/}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(withRouter(Recipes));
