import styles from './styles/conversation.module.scss';
import { Avatar, TimeAgo } from '../../Interface';

function Conversation({ author, lastMessage }) {
  return (
    <div className={styles.conversationBox}>
      <Avatar img={author.profileImg} />
      <div className={styles.infoBox}>
        <p className={styles.conversationAuthor}>{author.userName}</p>
        <div className={styles.miniBox}>
          <p className={styles.conversationLastMessage}>{lastMessage.message}</p>
          <TimeAgo className={styles.conversationDate} date={lastMessage.createdAt} />
        </div>
      </div>
    </div>
  );
}

export default Conversation;
