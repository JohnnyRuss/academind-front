import styles from "./components/styles/sideBar.module.scss";
import UserConstantInfo from "./components/UserConstantInfo";
import EditableList from "./components/EditableList";

function SideBar(props) {
  return (
    <aside className={styles.sideBarContainer}>
      <UserConstantInfo />
      <EditableList />
    </aside>
  );
}

export default SideBar;
