import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '../../hoc/ActiveLink';

export default ({ to, title, icon }) => (
  <ActiveLink href={to} color="#555" focusColor="#10aeb2" activeColor="#10aeb2">
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
    `}</style>
  </ActiveLink>
);
