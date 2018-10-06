import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButton from '../../shared/ActionButton';

const btnStyle = {
  backgroundColor: '#fff',
  color: '#06b4fe',
  cursor: 'pointer'
};

export default props => {
  return (
    <div className="change-rate">
      <h5 className="title">Rate this recipe</h5>
      <div className="rating-single-container">
        {props.sys.map((el, index) => (
          <div
            onClick={props.eventHandler(index)}
            className="rating-single"
            key={index}
          >
            <FontAwesomeIcon
              icon="star"
              color={el === 'full' ? '#ffd166' : '#cad1de'}
            />
          </div>
        ))}
      </div>
      <div className="button-container">
        <ActionButton
          handleClick={props.sendRate}
          customStyle={btnStyle}
          disabled={props.pristine}
        >
          Send
        </ActionButton>
      </div>
      <style jsx>{`
        .change-rate {
          margin: 0px;
          padding: 30px 0px;
          width: 95%;
          border-top: 1px solid #ccc;
          margin-left: auto;
          margin-right: auto;
          background: #fff;
        }

        .title {
          margin: 0;
          color: #26335e;
          font-weight: 900;
          text-align: center;
        }

        .rating-single-container {
          display: flex;
          flex-flow: row nowrap;
          width: 80%;
          padding: 0 16px;
          justify-content: space-between;
          margin: 25px auto 40px auto;
        }

        .rating-single {
          flex: 0 0 15%;
          font-size: 36px;
          position: relative;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};
