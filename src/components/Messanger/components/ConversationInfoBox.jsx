import styles from "./styles/conversationInfoBox.module.scss";
import { TimeAgo } from "../../Layouts";

function ConversationInfoBox({ userName, lastMessage, lastMessagePrefix }) {
  const last = lastMessage.message?.includes("</br>")
    ? lastMessage.message.replaceAll("</br>", " ")
    : lastMessage.message;

  return (
    <div className={styles.infoBox}>
      <p className={styles.conversationAuthor}>{userName}</p>
      <div className={styles.miniBox}>
        <p className={styles.conversationLastMessage}>
          {lastMessagePrefix ? <span>you: </span> : ""}
          {lastMessage?.message?.length > 12
            ? `${last.substring(0, 12)}...`
            : last}
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
