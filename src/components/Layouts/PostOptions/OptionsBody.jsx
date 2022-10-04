import { useSavePostQuery } from '../../../hooks';

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
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);

  return (
    <div className={`${styles.postOptionsModal}  options--big--modal--window`}>
      {loading && <Spinner />}
      {!loading && (
        <>
          {optionsRules?.belongsToUser && (
            <button className={styles.postOptBtn} onClick={handleUpdate}>
              <UpdateIcon />
              <span>update</span>
            </button>
          )}
          <button className={`${styles.postOptBtn} ${styles.bookmark}`} onClick={handleSavePost}>
            {optionsRules?.isBookmarked && <BookmarkFillIcon />}
            {!optionsRules?.isBookmarked && <BookmarkOutlineIcon />}
            <span>save</span>
          </button>
          <button className={styles.postOptBtn}>
            <ErrorIcon />
            <span>report</span>
          </button>
          {optionsRules?.belongsToUser && (
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
