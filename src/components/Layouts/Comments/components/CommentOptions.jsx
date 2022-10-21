import { useState } from 'react';

import styles from './styles/commentOptions.module.scss';
import { DotsHorizontalIcon, DeleteIcon, PinIcon, UpdateIcon } from '../../Icons/icons';
import DeletionPopUp from '../../DeletionPopUp/DeletionPopUp';

function CommentOptions({
  belongsActiveUser,
  postBelongsToActiveUser,
  pinHandler,
  updateHandler,
  deleteHandler,
}) {
  const [deletion, setDeletion] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  function handleDeletePopUp() {
    setDeletion(true);
    setOpenOptions(false);
  }

  function handleDelete() {
    deleteHandler();
    setDeletion(false);
  }

  return (
    <>
      <div className={styles.commentOptBox}>
        <button
          className={styles.commentOptMainBtn}
          onClick={() => setOpenOptions((prevState) => !prevState)}>
          <DotsHorizontalIcon />
        </button>
        {openOptions && (
          <div className={styles.commentOptionsModal}>
            {postBelongsToActiveUser && (
              <button
                className={styles.optBtn}
                onClick={() => {
                  pinHandler();
                  setOpenOptions(false);
                }}>
                <PinIcon />
                <span>pin</span>
              </button>
            )}
            {belongsActiveUser && (
              <button
                className={styles.optBtn}
                onClick={() => {
                  updateHandler();
                  setOpenOptions(false);
                }}>
                <UpdateIcon />
                <span>update</span>
              </button>
            )}
            {postBelongsToActiveUser && (
              <button
                className={`${styles.optBtn} ${styles.deleteBtn}`}
                onClick={handleDeletePopUp}>
                <DeleteIcon />
                <span>delete</span>
              </button>
            )}
          </div>
        )}
      </div>
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={handleDelete} keyWord='comment' />
      )}
    </>
  );
}

export default CommentOptions;
