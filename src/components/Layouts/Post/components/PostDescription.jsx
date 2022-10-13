import { useState, useEffect } from 'react';
import { useWindowDimention } from '../../../../hooks';

import styles from './styles/postDescription.module.scss';

function PostDescription({ description, className }) {
  const [showMore, setShowMore] = useState(false);

  const [limit, setLimit] = useState(980);
  const { width } = useWindowDimention();
  useEffect(() => {
    if (width <= 680) setLimit(450);
    else if (width <= 960) setLimit(600);
    else setLimit(980);
  }, [width]);

  const text =
    description?.length > limit && !showMore ? (
      <>
        {description?.slice(0, limit).concat('...')}{' '}
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
