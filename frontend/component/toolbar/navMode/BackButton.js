import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <div>
    <Link href="/recipes">
      <span>
        <FontAwesomeIcon icon="arrow-left" color="#919bb0" />
      </span>
    </Link>
  </div>
);
