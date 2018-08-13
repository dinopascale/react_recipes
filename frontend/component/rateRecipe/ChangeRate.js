import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButton from '../../shared/ActionButton';

const btnStyle = {
  backgroundColor: '#ffd166',
  padding: '10px 50px',
  borderRadius: '10px'
};

export default props => {
  return (
    <div className="change-rate">
      <h4 className="title">Rate this Recipe!</h4>
      <div className="rating-single-container">
        {props.sys.map((el, index) => (
          <div
            onClick={props.eventHandler(index)}
            className="rating-single"
            key={index}
          >
            <FontAwesomeIcon
              icon="star"
              color={el === 'full' ? '#ffd166' : '#eee'}
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
          margin: 40px 0 80px 0;
          padding: 0 20px;
        }

        .title {
          text-align: center;
        }

        .rating-single-container {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          margin: 30px 0 40px 0;
        }

        .rating-single {
          flex: 1 0 20%;
          font-size: 36px;
          position: relative;
          text-align: center;
        }

        .button-container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
