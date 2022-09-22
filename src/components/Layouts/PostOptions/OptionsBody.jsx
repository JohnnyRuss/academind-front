import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { axiosQuery } from '../../../store/axiosConfig';
import { removeBookmark } from '../../../store/reducers/postsDataReducer';

import styles from './styles/optionsBody.module.scss';
import { Spinner } from '../../Interface';
import {
  UpdateIcon,
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  ErrorIcon,
  DeleteIcon,
} from '../Icons/icons';

function OptionsBody({ handleUpdate, handleDeletePopUp, savePostHandler, postId }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(true);

  function removeBookmarkHandler() {
    if (pathname.endsWith('bookmarks')) dispatch(removeBookmark(postId));
  }

  function handleSavePost() {
    savePostHandler();
    rules.isBookmarked && removeBookmarkHandler();
    setRules((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
    }));
  }

  useEffect(() => {
    async function getOptionsInfo() {
      await axiosQuery(`/posts/${postId}/options`).then(({ data }) => {
        setRules(data);
        setLoading(false);
      });
    }

    getOptionsInfo();
  }, [postId]);

  return (
    <div className={`${styles.postOptionsModal}  options--big--modal--window`}>
      {loading && <Spinner />}
      {!loading && (
        <>
          {rules.belongsToUser && (
            <button className={styles.postOptBtn} onClick={handleUpdate}>
              <UpdateIcon />
              <span>update</span>
            </button>
          )}
          <button className={`${styles.postOptBtn} ${styles.bookmark}`} onClick={handleSavePost}>
            {rules.isBookmarked && <BookmarkFillIcon />}
            {!rules.isBookmarked && <BookmarkOutlineIcon />}
            <span>save</span>
          </button>
          <button className={styles.postOptBtn}>
            <ErrorIcon />
            <span>report</span>
          </button>
          {rules.belongsToUser && (
            <button
              className={`${styles.postOptBtn} ${styles.postOptBtnDelete}`}
              onClick={handleDeletePopUp}>
              <DeleteIcon />
              <span>delete</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default OptionsBody;
