import { useState } from 'react';

import { useBlurOnBody, useForeignUser } from '../../../../hooks';

import styles from './styles/postOptions.module.scss';
import DeletionPopUp from '../../DeletionPopUp/DeletionPopUp';
import {
  DotsHorizontalIcon,
  UpdateIcon,
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  ErrorIcon,
  DeleteIcon,
} from '../../Icons/icons';

function PostOptions({ deleteHandler, updateHandler, authorId, options }) {
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

  const belongsToActiveUser = useForeignUser('basedOnId', authorId);

  const { blur, onFocus } = useBlurOnBody(handleOnFocus, handleOnBlur, [
    'options--big--modal--window',
    'options--big--modal--window--btn',
  ]);

  return (
    <>
      <button
        onClick={onFocus}
        data-opt-btn
        className={`${styles.openPostOptBtn} options--big--modal--window--btn`}>
        <DotsHorizontalIcon />
      </button>
      {open && !blur && (
        <div className={`${styles.postOptionsModal}  options--big--modal--window`}>
          {belongsToActiveUser && (
            <button className={styles.postOptBtn} onClick={handleUpdate}>
              <UpdateIcon />
              <span>update</span>
            </button>
          )}
          <button className={`${styles.postOptBtn} ${styles.bookmark}`}>
            {/* <BookmarkFillIcon /> */}
            <BookmarkOutlineIcon />
            <span>save</span>
          </button>
          <button className={styles.postOptBtn}>
            <ErrorIcon />
            <span>report</span>
          </button>
          {belongsToActiveUser && (
            <button
              className={`${styles.postOptBtn} ${styles.postOptBtnDelete}`}
              onClick={handleDeletePopUp}>
              <DeleteIcon />
              <span>delete</span>
            </button>
          )}
        </div>
      )}
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={handleDelete} keyWord='post' />
      )}
    </>
  );
}

export default PostOptions;
