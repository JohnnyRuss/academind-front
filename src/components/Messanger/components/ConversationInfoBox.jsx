import styles from "./styles/conversationInfoBox.module.scss";
import { TimeAgo } from "../../Layouts";

function ConversationInfoBox({ userName, lastMessage, lastMessagePrefix }) {
  return (
    <div className={styles.infoBox}>
      <p className={styles.conversationAuthor}>{userName}</p>
      <div className={styles.miniBox}>
        <p className={styles.conversationLastMessage}>
          {lastMessagePrefix ? <span>you: </span> : ""}
          {lastMessage?.message?.length > 12
            ? `${lastMessage.message.substring(0, 12)}...`
            : lastMessage?.message}
        </p>
        <TimeAgo
          className={styles.conversationDate}
          date={lastMessage?.createdAt}
        />
      </div>
    </div>
  );
}

export default ConversationInfoBox;
