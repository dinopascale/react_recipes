export default ({ active, next, back, error, fields, children }) => (
  <div className={active ? 'step active' : 'step'}>
    {children}
    <div>
      <p>{error ? error : null}</p>
    </div>
    <button onClick={back}>Back</button>
    <button onClick={next(fields)}>Next</button>
    <style jsx>{`
      .step {
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translate(-1000px, 0);
        overflow-y: auto;
        background: #fff;
        transition: all 0.5s ease-out;
      }

      .step.active {
        opacity: 1;
        z-index: 110;
        transform: translate(0, 0);
      }
    `}</style>
  </div>
);
