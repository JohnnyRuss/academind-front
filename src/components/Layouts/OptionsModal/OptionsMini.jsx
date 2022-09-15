import { useState } from 'react';

import styles from './optionsModal.module.scss';
import { UpdateIcon, DeleteIcon, PinIcon, DotsHorizontalIcon } from '../Icons/icons';
import DeletionPopUp from './DeletionPopUp';

/**
 * little modal window for options which one you can controll by the props
 * @param {String} className passed on actual modal window for more controll, for example for positioning. options dotted button is outside of window so you can't access it from this className
 * @param {Boolean} withBtn by default is true. it defines if modal window be rendered with its own option dotted button or not
 * @param {String} btnClassName passed on actual option button for more controll
 * @param {function} updateHandler function which is append on update button
 * @param {function} deleteHandler function which is append on delete button
 * @param {String} keyword this commponent has its own popup on deletion. keyword describes target which one user want to delete. more exactly popup has a text --> "are you sure you want to delete this [$keyWord||information] ?"
 * @param {Boolean} pin by default is true. is defines if modal window has or not pin button
 * @returns
 */
function OptionsMini({
  updateHandler,
  deleteHandler,
  pinHandler,
  className,
  btnClassName,
  keyWord,
  withBtn = true,
  withPin = true,
}) {
  const [deletion, setDeletion] = useState(false);
  const [openOptions, setOpenOptions] = useState(!withBtn);

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
      {withBtn && (
        <button
          className={`${styles.optBtn} ${btnClassName || ''}`}
          onClick={() => setOpenOptions((prevState) => !prevState)}>
          <DotsHorizontalIcon />
        </button>
      )}
      {openOptions && (
        <div className={`${styles.optionsModal} ${className || ''}`}>
          {withPin && (
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
          <button
            className={styles.optBtn}
            onClick={() => {
              updateHandler();
              setOpenOptions(false);
            }}>
            <UpdateIcon />
            <span>update</span>
          </button>
          <button className={styles.optBtn} onClick={handleDeletePopUp}>
            <DeleteIcon />
            <span>delete</span>
          </button>
        </div>
      )}
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={handleDelete} keyWord={keyWord} />
      )}
    </>
  );
}

export default OptionsMini;
