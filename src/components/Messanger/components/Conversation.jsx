import { useParams, Link } from 'react-router-dom';

import styles from './styles/conversation.module.scss';
import { Avatar, TimeAgo } from '../../Interface';

function Conversation({ author, lastMessage, conversationId }) {
  const { id } = useParams();

  return (
    <Link
      to={conversationId}
      className={`${styles.conversationBox} ${
        conversationId === id && styles.activeConversationBox
      }`}>
      <Avatar img={author.profileImg} />
      <div className={styles.infoBox}>
        <p className={styles.conversationAuthor}>{author.userName}</p>
        <div className={styles.miniBox}>
          <p className={styles.conversationLastMessage}>{lastMessage?.message}</p>
          <TimeAgo className={styles.conversationDate} date={lastMessage?.createdAt} />
        </div>
      </div>
    </Link>
  );
}

export default Conversation;
