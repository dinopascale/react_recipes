export default ({ steps, actual, jumpBack }) => {
  const numbers = Array.from(Array(+steps).keys());
  return (
    <div className="container">
      <ul className="progressBar">
        {numbers.map(number => (
          <li
            className={[
              'steps-circle',
              actual === number ? 'active' : null,
              actual - 1 >= number ? 'completed' : null
            ].join(' ')}
            key={number}
            onClick={jumpBack(number)}
            data-step={number + 1}
          />
        ))}
      </ul>
      <style jsx>{`
        .container {
          position: absolute;
          top: 40px;
          left: 50%;
          width: 90%;
          transform: translate(-50%, 0);
        }

        .progressBar {
          margin: 0;
          min-height: 50px;
          padding: 0;
          display: flex;
          flex-flow: row nowrap;
        }

        .steps-circle {
          list-style-type: none;
          width: ${100 / steps}%;
          font-size: 14px;
          position: relative;
          text-align: center;
          color: #fff;
        }

        .steps-circle:before {
          content: attr(data-step);
          margin: 0 auto 10px auto;
          width: 30px;
          height: 30px;
          line-height: 30px;
          display: block;
          border-radius: 50%;
          background-color: #77b5ff;
          transition: all 0.3s ease-in;
        }

        .steps-circle:after {
          width: 100%;
          height: 2px;
          content: '';
          position: absolute;
          background-color: #77b5ff;
          top: 15px;
          left: -50%;
          z-index: -1;
          transition: all 0.3s ease-in;
        }

        .steps-circle:first-child:after {
          content: none;
        }

        .steps-circle.completed:before {
          background-color: #00e676;
        }

        .steps-circle.completed:after {
          background-color: #00e676;
        }

        .steps-circle.active:before {
          transform: scale(1.3);
        }

        .steps-circle.active:after {
          background-color: #00e676;
        }
      `}</style>
    </div>
  );
};
