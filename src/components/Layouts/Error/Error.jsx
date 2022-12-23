import styles from "./error.module.scss";
import { ErrorIcon } from "../Icons/icons";

function Error({ msg, asModal = false, onClose = () => {}, className }) {
  return (
    <div
      className={`${styles.error} ${asModal ? styles.asModal : ""} ${
        className || ""
      }`}
      onClick={() => {
        if (!asModal) return;
        onClose();
      }}
      data-error-box
    >
      <div className={styles.innerContainer}>
        <ErrorIcon />
        {msg}
        {asModal && (
          <button onClick={() => onClose()} className={styles.closeBtn}>
            ok
          </button>
        )}
      </div>
    </div>
  );
}

export default Error;
