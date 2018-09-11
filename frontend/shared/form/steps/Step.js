export default ({ active, next, back, error, fields, children }) => (
  <div
    className={[
      active ? 'step active' : 'step',
      error && active ? 'error' : null
    ].join(' ')}
  >
    {children}
    {next && back ? (
      <div className="row-nav">
        <button className="nav-btn back" onClick={back}>
          Back
        </button>
        <button className="nav-btn next" onClick={next(fields)}>
          Next
        </button>
      </div>
    ) : null}
    <style jsx>{`
      .step {
        padding: 20px 20px 5px 20px;
        position: absolute;
        top: 110px;
        left: 50%;
        width: 90%;
        border-radius: 4px;
        opacity: 0;
        transform: translate(-1000px, 0);
        overflow-y: auto;
        background: #fff;
        transition: all 0.5s ease-out;
      }

      .step.active {
        opacity: 1;
        z-index: 110;
        transform: translate(-50%, 0);
      }

      .step.active.error {
        animation: wrong 0.3s 1 linear;
      }

      @keyframes wrong {
        0%,
        100%,
        50% {
          transform: translate(-50%, 0);
        }

        25% {
          transform: translate(-52%, 0);
        }

        75% {
          transform: translate(-42%, 0);
        }
      }

      .row-error {
        margin-top: 30px;
      }

      .error-message {
        margin: 0;
        font-size: 14px;
        font-style: italic;
        line-height: 1.6;
        color: #b71c1c;
      }

      .row-nav {
        margin-top: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
      }

      .nav-btn {
        border: none;
        background: none;
        padding: 12px;
        font-family: 'Open Sans', sans-serif;
        flex-basis: 30%;
        outline: none;
      }

      .nav-btn.back {
        color: #aaa;
        text-align: left;
        padding-left: 0px;
      }

      .nav-btn.next {
        text-align: right;
        font-weight: bold;
        padding-right: 0px;
      }
    `}</style>
  </div>
);
