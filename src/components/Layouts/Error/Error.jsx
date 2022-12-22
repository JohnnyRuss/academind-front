import { useState } from "react";

import styles from "./error.module.scss";
import { ErrorIcon } from "../Icons/icons";

function Error({ msg, asModal = false }) {
  const [isOpen, setIsOpen] = useState(asModal);

  return (
    ((!!asModal && isOpen) || !asModal) && (
      <div
        className={`${styles.error} ${asModal ? styles.asModal : ""}`}
        onClick={() => {
          if (!asModal) return;
          setIsOpen(false);
        }}
      >
        <div className={styles.innerContainer}>
          <ErrorIcon />
          {msg}
          {asModal && (
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
            >
              ok
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default Error;
