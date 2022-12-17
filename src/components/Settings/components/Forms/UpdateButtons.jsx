import styles from "../styles/detailed.module.scss";

function UpdateButtons({ updateHandler, cancelHandler }) {
  return (
    <div className={styles.updateBtnBox}>
      <button
        onClick={(e) => {
          e.preventDefault();
          cancelHandler();
        }}
        className={styles.cancelBtn}
      >
        cancel
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateHandler();
        }}
        className={styles.updateBtn}
      >
        update
      </button>
    </div>
  );
}

export default UpdateButtons;
