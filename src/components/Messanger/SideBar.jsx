import { useSelector } from "react-redux";
import { selectUserId } from "../../store/selectors/userSelectors.js";
import { selectAllConversations } from "../../store/selectors/conversationSelectors.js";

import styles from "./components/styles/sideBar.module.scss";
import Conversation from "./components/Conversation";

function SideBar() {
  const { id } = useSelector(selectUserId);
  const conversations = useSelector(selectAllConversations);

  function getLatsMsgDateCreation(conversation) {
    const i = conversation.messages.length - 1;
    return new Date(conversation.messages[i].createdAt).getTime();
  }

  return (
    <aside className={styles.sideBar}>
      {conversations[0] && (
        <div className={styles.contentBox}>
          {[...conversations]
            ?.sort(
              (a, b) => getLatsMsgDateCreation(b) - getLatsMsgDateCreation(a)
            )
            .map((conversation) => (
              <Conversation
                key={conversation._id}
                author={conversation.users.find((user) => user._id !== id)}
                conversationId={conversation._id}
                lastMessage={
                  conversation.messages[conversation.messages.length - 1]
                }
              />
            ))}
        </div>
      )}
    </aside>
  );
}

export default SideBar;
