import { useState } from 'react';
import { DotsHorizontalIcon, ErrorIcon, BookmarkOutlineIcon } from '../../../Layouts/Icons/icons';
import styles from './styles/blogPostOptions.module.scss';

function BlogPostOptions() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.blogPostOptions}>
      <button className={styles.blogPostOptBtn} onClick={() => setOpen((prev) => !prev)}>
        <DotsHorizontalIcon />
      </button>
      {open && (
        <div className={styles.blogPostOptionsList}>
          <button>
            <BookmarkOutlineIcon />
            save
          </button>
          <button>
            <ErrorIcon />
            report
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogPostOptions;
