import { useState } from 'react';

import { useBlurOnBody } from '../../../hooks';

import styles from './optionsModal.module.scss';
import DeletionPopUp from './DeletionPopUp';
import {
  UpdateIcon,
  DeleteIcon,
  BookmarkOutlineIcon,
  ErrorIcon,
  DotsHorizontalIcon,
} from '../Icons/icons';

/**
 * @param  param object of options
 * @param {string} param.keyWord represents kind of document. for example if you use this options modal into the post component and you will say keyWord = 'post', then deletion popup be like "are you sure you want to delete this [post] ?"
 * @param {object} param.options this is like a menu. the property which one be marked as true will rendered as an option button. By default all of them are true
 * @param param.updateHandler attached on update button
 * @param param.deleteHandler attached on delete button
 * @param param.modalClassName controls modal box
 * @param param.optBtnClassName controls modal box button
 */
function OptionsBig({
  keyWord,
  restriction,
  options = { update: true, save: true, report: true, delete: true },
  updateHandler,
  deleteHandler,
  modalClassName,
  optBtnClassName,
}) {
  const [open, setOpen] = useState(false);
  const [deletion, setDeletion] = useState(false);

  function handleDeletePopUp() {
    setDeletion(true);
    setOpen(false);
  }

  function handleDelete() {
    deleteHandler();
    setDeletion(false);
  }

  function handleUpdate() {
    updateHandler();
    setOpen(false);
  }

  const handleOnFocus = () => {
    setOpen((prev) => !prev);
  };

  const handleOnBlur = () => {
    setOpen(false);
  };

  const { blur, onFocus } = useBlurOnBody(handleOnFocus, handleOnBlur, [
    'options--big--modal--window',
    'options--big--modal--window--btn',
  ]);

  return (
    <>
      <button
        onClick={onFocus}
        data-opt-btn
        className={`${styles.openOptBtn} ${optBtnClassName} options--big--modal--window--btn`}>
        <DotsHorizontalIcon />
      </button>
      {open && !blur && (
        <div
          className={`${styles.optionsModal} ${styles.optBig} ${modalClassName} options--big--modal--window`}>
          {restriction && options?.update && (
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
          {restriction && options?.delete && (
            <button className={styles.optBtn} onClick={handleDeletePopUp}>
              <DeleteIcon />
              <span>delete</span>
            </button>
          )}
        </div>
      )}
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={handleDelete} keyWord={keyWord} />
      )}
    </>
  );
}

export default OptionsBig;
