import CallToAction from '../../shared/CallToAction';

export default () => (
  <div className="header">
    <h4>Ready to share your next recipe?</h4>
    <CallToAction href="/auth" small>
      Login
    </CallToAction>
    <style jsx>{`
      .header {
        width: 100%;
        margin: 0 0 30px 0;
        padding: 35px 15px;
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
        background-color: #ef476f;
        color: #fff;
      }
      .header h4 {
        margin: 0 0 30px 0;
        font-size: 24px;
        line-height: 1.5;
      }
    `}</style>
  </div>
);
