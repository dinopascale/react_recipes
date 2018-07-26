import CallToAction from '../shared/CallToAction';

export default ({ title, subtitle, ctaLink, ctaTitle }) => (
  <div className="hero">
    <h1>{title}</h1>
    <h6>{subtitle}</h6>
    {ctaLink || ctaTitle ? (
      <CallToAction href={ctaLink}>{ctaTitle}</CallToAction>
    ) : null}
    <style jsx>{`
      .hero {
        width: 100%;
        padding: 5px 25px;
        box-sizing: border-box;
      }

      .hero h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 60px;
        margin-bottom: 30px;
      }

      .hero h6 {
        margin-top: 0px;
        margin-bottom: 40px;
        font-size: 22px;
        line-height: 1.7;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.4);
      }
    `}</style>
  </div>
);
