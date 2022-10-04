import { useState } from 'react';
import { useSavePostQuery } from '../../../../hooks';

import styles from './styles/blogPostOptions.module.scss';
import { Spinner } from '../../../Interface';
import {
  DotsHorizontalIcon,
  ErrorIcon,
  BookmarkOutlineIcon,
  BookmarkFillIcon,
} from '../../../Layouts/Icons/icons';

function BlogPostOptions({ postId }) {
  const [open, setOpen] = useState(false);
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);

  return (
    <div className={styles.blogPostOptions}>
      <button className={styles.blogPostOptBtn} onClick={() => setOpen((prev) => !prev)}>
        <DotsHorizontalIcon />
      </button>
      {open && (
        <div className={styles.blogPostOptionsList}>
          {loading && <Spinner />}
          {!loading && (
            <>
              <button onClick={handleSavePost}>
                {optionsRules?.isBookmarked && <BookmarkFillIcon />}
                {!optionsRules?.isBookmarked && <BookmarkOutlineIcon />}
                <span>save</span>
              </button>
              <button>
                <ErrorIcon />
                report
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogPostOptions;
