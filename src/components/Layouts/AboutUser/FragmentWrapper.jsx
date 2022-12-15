import styles from "./styles/fragmentWrapper.module.scss";
import { EditIcon } from "../Icons/icons";

function FragmentWrapper({ icon, children, editable }) {
  return (
    <div className={styles.fragmentWrapper}>
      <span className={styles.fragmentIcon}>{icon}</span>
      <div className={styles.fragmentChildren}>{children}</div>
      {editable && (
        <button className={styles.editableBtn}>
          <EditIcon />
        </button>
      )}
    </div>
  );
}

export default FragmentWrapper;
