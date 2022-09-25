import { useState } from 'react';

import styles from './styles/infoOptions.module.scss';
import { DeletionPopUp } from '../../../Layouts';
import { DotsHorizontalIcon, UpdateIcon, DeleteIcon } from '../../../Layouts/Icons/icons';

function InfoOptions({
  activeOpt,
  activeOptTarget,
  activateOptions,
  name,
  deleteHandler,
  updateHandler,
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
    <div className={styles.infoOptBox}>
      <button
        className={styles.infoOptBtn}
        name={name}
        onClick={(e) => {
          activateOptions(e.currentTarget.name);
          setOpenOptions((prevState) => !prevState);
        }}>
        <DotsHorizontalIcon />
      </button>
      {activeOpt && activeOptTarget === name && (
        <>
          {openOptions && (
            <div className={styles.infoOptionsModal}>
              <>
                <button
                  className={styles.optBtn}
                  onClick={() => {
                    updateHandler();
                    setOpenOptions(false);
                  }}>
                  <UpdateIcon />
                  <span>update</span>
                </button>
                <button
                  className={`${styles.optBtn} ${styles.deleteBtn}`}
                  onClick={handleDeletePopUp}>
                  <DeleteIcon />
                  <span>delete</span>
                </button>
              </>
            </div>
          )}
          {deletion && (
            <DeletionPopUp
              setDeletion={setDeletion}
              deleteHandler={handleDelete}
              keyWord='information'
            />
          )}
        </>
      )}
    </div>
  );
}

export default InfoOptions;
