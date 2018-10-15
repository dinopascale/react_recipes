import ActionButton from '../../shared/ActionButton';
import { withRouter } from 'next/router';

const WelcomePage = ({ router }) => {
  return (
    <div className="welcome-container">
      <h4 className="title">Create Your New Recipe!</h4>
      <p className="sub-title body-one">
        It's really simple: click on the button down below and follow the
        instructions!
      </p>
      <div className="button-row">
        <ActionButton
          isLink
          href="/new_recipe/step?stepName=general&step=1"
          as="/new_recipe/general"
          customStyle={{
            backgroundColor: 'rgb(6, 180, 254)',
            color: '#fff'
          }}
        >
          Start
        </ActionButton>
      </div>
      <style jsx>{`
        .welcome-container {
          background: #fff;
          padding: 24px;
          max-width: 500px;
          margin: 0 auto;
        }

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
