import styles from './styles/tagReviewPostBody.module.scss';
import { Post } from '../../Layouts';
import { BTN } from '../../Interface';

function TagReviewPostBody({ post, removeTagHandler, showOnProfileHandler }) {
  return (
    <div className={styles.postWrapper}>
      <Post data={post} />
      <div className={styles.reviewBtnBox}>
        <BTN onClick={() => removeTagHandler(post._id)} className={styles.removeTagBtn}>
          remove tag
        </BTN>
        <BTN onClick={() => showOnProfileHandler(post._id, false)} className={styles.hideBtn}>
          hide from profile
        </BTN>
        <BTN onClick={() => showOnProfileHandler(post._id, true)} className={styles.addBtn}>
          add to profile
        </BTN>
      </div>
    </div>
  );
}

export default TagReviewPostBody;
