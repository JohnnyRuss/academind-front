import styles from './styles/message.module.scss';
import ChatMessage from './ChatMessage';

function Message({ msgGroup, activeUserId, adressatImage }) {
  return (
    <p className={styles.messageBox}>
      <ChatMessage msgGroup={msgGroup} activeUserId={activeUserId} adressatImage={adressatImage} />
    </p>
  );
}

export default Message;
