import { useSavePostQuery } from '../../../../hooks';

import styles from './styles/blogPostOptionsBody.module.scss';
import { Spinner } from '../../../Interface';
import { ErrorIcon, BookmarkOutlineIcon, BookmarkFillIcon } from '../../../Layouts/Icons/icons';

function BlogPostOptionsBody({ postId }) {
  const { loading, optionsRules, handleSavePost } = useSavePostQuery(postId);
  
  return (
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
  );
}

export default BlogPostOptionsBody;
