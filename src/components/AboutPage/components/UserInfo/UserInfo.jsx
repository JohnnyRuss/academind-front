import { useSelector } from 'react-redux';

import styles from './userInfo.module.scss';
import { BasicInfoBlock, EduBlock, AboutNav } from './';

/**
 * this is the AboutPage left side root which one contains and ties together left side navigation and his blocks-: basic info block and education block
 * @param {Object} userInfo object which one contains the user info
 * @returns 
 */
function UserInfo({ userInfo }) {
  const navTarget = useSelector(({ aboutPage }) => aboutPage.navTarget);

  return (
    <div className={styles.userInfo}>
      <AboutNav />
      {navTarget === 'basics' && <BasicInfoBlock userInfo={userInfo} />}
      {navTarget === 'edu' && <EduBlock userInfo={userInfo} />}
    </div>
  );
}

export default UserInfo;
