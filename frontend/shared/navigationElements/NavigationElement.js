import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '../../hoc/ActiveLink';

export default ({ href, as, title, icon }) => (
  <ActiveLink
    href={href}
    as={as}
    color="#555"
    focusColor="#10aeb2"
    activeColor="#06b4fe"
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
    `}</style>
  </ActiveLink>
);
