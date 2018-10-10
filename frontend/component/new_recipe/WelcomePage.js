import ActionButton from '../../shared/ActionButton';
import { withRouter } from 'next/router';

const WelcomePage = ({ router }) => {
  return (
    <div>
      <h4 className="title">Create Your New Recipe!</h4>
      <p className="sub-title body-one">
        It's really simple: click on the button down below and follow the
        instructions!
      </p>
      <div className="button-row">
        <ActionButton
          //   handleClick={() =>
          //     router.push(
          //       '/new_recipe/step?stepName=general&step=1',
          //       '/new_recipe/general'
          //     )
          //   }
          isLink
          href="/new_recipe/step?stepName=general&step=1"
          as="/new_recipe/general"
          customStyle={{
            backgroundColor: 'rgb(6, 180, 254)',
            color: '#fff'
          }}
        >
          General
        </ActionButton>
        <ActionButton
          handleClick={() =>
            router.push(
              '/new_recipe/step?stepName=times&step=2',
              '/new_recipe/times'
            )
          }
          customStyle={{
            backgroundColor: 'rgb(6, 180, 254)',
            color: '#fff'
          }}
        >
          times
        </ActionButton>
        <ActionButton
          handleClick={() =>
            router.push(
              '/new_recipe/step?stepName=directions&step=3',
              '/new_recipe/directions'
            )
          }
          customStyle={{
            backgroundColor: 'rgb(6, 180, 254)',
            color: '#fff'
          }}
        >
          directions
        </ActionButton>
        <ActionButton
          handleClick={() =>
            router.push(
              '/new_recipe/step?stepName=ingredients&step=4',
              '/new_recipe/ingredients'
            )
          }
          customStyle={{
            backgroundColor: 'rgb(6, 180, 254)',
            color: '#fff'
          }}
        >
          ingredients
        </ActionButton>
      </div>
      <style jsx>{`
        .title {
          color: #26335e;
          font-weight: 900;
          margin: 0 0 24px 0;
        }

        .sub-title {
          margin: 0 0 48px 0;
          line-height: 1.6;
          color: #777e8e;
        }

        .button-row {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default withRouter(WelcomePage);
