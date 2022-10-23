import styles from './styles/conversation.module.scss';
import { Avatar } from '../../Interface';

function Conversation({ author, authorImage, message, timeAgo }) {
  return (
    <div className={styles.conversationBox}>
      {/* <Image dimention={['5rem', '5rem']} radius='50%' src={authorImage} /> */}
      <Avatar img={authorImage} />
      <div className={styles.infoBox}>
        <p className={styles.conversationAuthor}>{author}</p>
        <div className={styles.miniBox}>
          <p className={styles.conversationLastMessage}>{message}</p>
          <p className={styles.conversationDate}>{timeAgo}</p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
