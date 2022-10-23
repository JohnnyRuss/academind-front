import styles from './styles/chatMessage.module.scss';
import { Avatar } from '../../Interface';

function ChatMessage({ msgGroup, activeUserId, adressatImage }) {
  return (
    <>
      {msgGroup[0]?.user !== activeUserId && <Avatar img={adressatImage} />}
      <div className={styles.chatMessageGroupBox}>
        {msgGroup?.map((group, i, arr) => (
          <span
            className={`${styles.messageText} ${
              group.user === activeUserId ? styles.activeUserMsg : ''
            } ${arr.length === 1 ? styles.singleInGroup : ''} ${
              arr.length > 1 && i === 0 ? styles.firstInGroup : ''
            } ${arr.length > 1 && i === arr.length - 1 ? styles.lastInGroup : ''} ${
              arr.length > 1 && i !== arr.length - 1 && i !== 0 ? styles.middleInGroup : ''
            }
            `}
            key={`message group ${i}`}>
            {group.text}
          </span>
        ))}
      </div>
    </>
  );
}

export default ChatMessage;
