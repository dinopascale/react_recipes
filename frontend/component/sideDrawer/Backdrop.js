import { Fragment } from 'react';

export default props => (
  <Fragment>
    {props.show ? <div className="backdrop" onClick={props.clicked} /> : null}
    <style jsx>{`
      .backdrop {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 199;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    `}</style>
  </Fragment>
);
