import styles from './styles/chatMessage.module.scss';
import { Avatar } from '../../Interface';

function ChatMessage({ msgGroup, activeUserId, adressatImage }) {
  return (
    <>
      {msgGroup[0]?.author !== activeUserId && <Avatar img={adressatImage} />}
      <p className={styles.chatMessageGroupBox}>
        {msgGroup?.map((message, i, arr) => (
          <span
            className={`${styles.messageText} ${
              message.author === activeUserId ? styles.activeUserMsg : ''
            } ${arr.length === 1 ? styles.singleInGroup : ''} ${
              arr.length > 1 && i === 0 ? styles.firstInGroup : ''
            } ${arr.length > 1 && i === arr.length - 1 ? styles.lastInGroup : ''} ${
              arr.length > 1 && i !== arr.length - 1 && i !== 0 ? styles.middleInGroup : ''
            }
            `}
            key={message._id}>
            {message.message}
          </span>
        ))}
      </p>
    </>
  );
}

export default ChatMessage;
