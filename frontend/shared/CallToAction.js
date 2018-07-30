import { withRouter } from 'next/router';

const CallToAction = ({ router, children, href, small }) => {
  const handleClick = () => {
    router.push(href);
  };

  return (
    <button className={small ? 'cta small' : 'cta'} onClick={handleClick}>
      {children}
      <style jsx>{`
        .cta {
          background-color: #ffd166;
          padding: 10px 50px;
          border-radius: 10px;
          font-family: 'Open Sans', sans-serif;
          font-weight: bold;
          font-size: 16px;
          border: none;
        }

        .cta.small {
          padding: 5px 30px;
          font-size: 14px;
        }
      `}</style>
    </button>
  );
};

export default withRouter(CallToAction);
