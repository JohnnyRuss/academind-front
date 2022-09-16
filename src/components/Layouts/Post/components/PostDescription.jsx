import { useState } from 'react';
import styles from './styles/postDescription.module.scss';

function PostDescription({ description, className }) {
  const [showMore, setShowMore] = useState(false);

  const text =
    description?.length > 350 && !showMore ? (
      <>
        {description?.slice(0, 750).concat('...')}{' '}
        <button onClick={() => setShowMore(true)} className={styles.showMoreBtn}>
          show more
        </button>
      </>
    ) : (
      description
    );

  return <p className={`${styles.postDescription} ${className}`}>{text}</p>;
}

export default PostDescription;
