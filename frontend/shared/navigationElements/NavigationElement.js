import ActiveLink from '../../hoc/ActiveLink';

export default ({ to, title }) => (
  <ActiveLink href={to}>
    <p>{title}</p>
  </ActiveLink>
);
