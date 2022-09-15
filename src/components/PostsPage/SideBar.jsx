import styles from './components/SideBar/sideBar.module.scss';
import UserInfo from './components/SideBar/UserInfo';
import UserFriends from './components/SideBar/UserFriends';

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <UserInfo />
      <UserFriends />
    </div>
  );
}

export default SideBar;
