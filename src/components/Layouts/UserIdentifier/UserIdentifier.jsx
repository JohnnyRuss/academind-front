import { Link } from 'react-router-dom';

import styles from './userIdentifier.module.scss';
import { TimeAgo, Avatar } from '../../Interface';
import { Audience } from '../';

/**
 * shows user image||avatar, userName and timeAgo Text
 * @param {Boolean} withTime by default true. defines if component will be rendered with timeAgo text. if true please even pass timeAgo prop
 * @param {String} timeAgo String||DateObject
 * @param {String} userName userName string
 * @param {String} img userImg url
 * @param {dateObject} className for more controll. passed on top level||parent element
 * @returns
 */
function UserIdentifier({
  userId,
  userName = 'userName',
  img = '/img/avatar.png',
  withTime = true,
  timeAgo,
  audience,
  children,
  className,
}) {
  return (
    <div className={`${styles.userIdentifierRe} ${className || ''}`} data-user-identifier>
      <Avatar img={img} />
      <Link
        to={`/profile/${userId}/posts`}
        className={styles.identifierUserName}
        data-identifier-username>
        {userName}
      </Link>
      {withTime && (
        <div className={styles.timeAndAudience}>
          <TimeAgo date={timeAgo} className={styles.dateTimeAgo} />
          <Audience audience={audience} />
        </div>
      )}
      <span className={styles.childBox}>{children}</span>
    </div>
  );
}

export default UserIdentifier;
