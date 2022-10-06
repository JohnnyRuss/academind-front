import styles from './userIdentifier.module.scss';
import { TimeAgo, Avatar, Link } from '../../Interface';
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
    <div className={`${styles.userIdentifierRe} ${className || ''}`}>
      <Avatar img={img} />
      <span className={styles.identifierDetails}>
        <Link path={`/profile/${userId}/posts`} className={styles.identifierUserName}>
          {userName}
        </Link>
        {withTime && (
          <div className={styles.timeAndAudience}>
            <TimeAgo date={timeAgo} className={styles.dateTimeAgo} />
            <Audience audience={audience} />
          </div>
        )}
      </span>
      {children}
    </div>
  );
}

export default UserIdentifier;
