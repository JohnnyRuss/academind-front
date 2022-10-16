import { useState } from 'react';

import { useBlurOnBody } from '../../../hooks';

import styles from './styles/postOptions.module.scss';
import DeletionPopUp from '../DeletionPopUp/DeletionPopUp';
import OptionsBody from './OptionsBody';
import { DotsHorizontalIcon } from '../Icons/icons';

function PostOptions({
  postId,
  audience,
  isBlogPostOptions = false,
  deleteHandler,
  updateHandler,
  removeTagHandler,
  hideFromProfileHandler,
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

  const handleOnFocus = () => setOpen((prev) => !prev);

  const handleOnBlur = () => setOpen(false);

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
        <OptionsBody
          postId={postId}
          audience={audience}
          isBlogPostOptions={isBlogPostOptions}
          handleUpdate={handleUpdate}
          handleDeletePopUp={handleDeletePopUp}
          removeTagHandler={removeTagHandler}
          hideFromProfileHandler={hideFromProfileHandler}
        />
      )}
      {deletion && (
        <DeletionPopUp setDeletion={setDeletion} deleteHandler={handleDelete} keyWord='post' />
      )}
    </>
  );
}

export default PostOptions;
