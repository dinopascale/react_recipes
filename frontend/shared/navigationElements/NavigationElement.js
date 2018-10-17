import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '../../hoc/ActiveLink';

export default ({ href, as, title, icon, full, textAlign }) => (
  <ActiveLink
    href={href}
    as={as}
    color="#777e8e"
    focusColor="#26335e"
    activeColor="#06b4fe"
    full={full}
    textAlign={textAlign}
  >
    <p>
      {icon ? (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      ) : null}
      {title}
    </p>
    <style jsx>{`
      span {
        margin-right: 10px;
      }

      p {
        margin: 10px 0;
      }

      @media (min-width: 499px) {
        p {
          margin: 0;
        }
      }
    `}</style>
  </ActiveLink>
);
