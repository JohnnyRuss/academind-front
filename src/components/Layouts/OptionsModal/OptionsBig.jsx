import { useState } from 'react';
import DeletionPopUp from './DeletionPopUp';

import styles from './optionsModal.module.scss';
import {
  UpdateIcon,
  DeleteIcon,
  BookmarkOutlineIcon,
  ErrorIcon,
  DotsHorizontalIcon,
} from '../Icons/icons';

function OptionsBig({
  keyWord,
  options = { update: true, save: true, report: true, delete: true },
  updateHandler,
  deleteHandler,
  modalClassName,
  optBtnClassName,
}) {
  const [open, setOpen] = useState(false);
  const [deletion, setDeletion] = useState(false);

  function handleDelete() {
    setDeletion(true);
    setOpen(false);
  }

  function handleUpdate() {
    updateHandler();
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        data-opt-btn
        className={`${styles.openOptBtn} ${optBtnClassName}`}>
        <DotsHorizontalIcon />
      </button>
      {open && (
        <div className={`${styles.optionsModal} ${styles.optBig} ${modalClassName}`}>
          {options?.update && (
            <button className={styles.optBtn} onClick={handleUpdate}>
              <UpdateIcon />
              <span>update</span>
            </button>
          )}
          {options?.save && (
            <button className={`${styles.optBtn} ${styles.bookmark}`}>
              <BookmarkOutlineIcon />
              <span>save</span>
            </button>
          )}
          {options?.report && (
            <button className={styles.optBtn}>
              <ErrorIcon />
              <span>report</span>
            </button>
          )}
          {options?.delete && (
            <button className={styles.optBtn} onClick={handleDelete}>
              <DeleteIcon />
              <span>delete</span>
            </button>
          )}
        </div>
      )}
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={deleteHandler} keyWord={keyWord} />
      )}
    </>
  );
}

export default OptionsBig;
