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
      <h5 className="title">Rate this Recipe!</h5>
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
        <ActionButton handleClick={props.sendRate} customStyle={btnStyle}>
          Send
        </ActionButton>
      </div>
      <style jsx>{`
        .change-rate {
          margin: 0px 0 20px 0;
          padding: 40px 20px;
          width: 95%;
          margin-left: auto;
          margin-right: auto;
          background: #fff;
        }

        .title {
          margin: 0;
          color: #26335e;
          font-weight: 900;
          //   text-align: center;
        }

        .rating-single-container {
          display: flex;
          flex-flow: row nowrap;
          margin: 20px 0 30px 0;
        }

        .rating-single {
          flex: 1 0 20%;
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
