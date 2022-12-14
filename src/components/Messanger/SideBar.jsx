import { useSelector } from "react-redux";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { selectAllConversations } from "../../store/selectors/conversationSelectors.js";

import { getConversationLastMsg } from "../../lib";

import styles from "./components/styles/sideBar.module.scss";
import Conversation from "./components/Conversation";

function SideBar() {
  const activeUserId = useSelector(selectActiveUserId);
  const { allConversations: conversations } = useSelector(
    selectAllConversations
  );

  function getLatsMsgDateCreation(conversation) {
    return new Date(getConversationLastMsg(conversation)?.createdAt).getTime();
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
                author={conversation.users.find(
                  (user) => user._id !== activeUserId
                )}
                conversationId={conversation._id}
                lastMessage={conversation.lastMessage}
                adressatId={
                  conversation.users?.find((user) => user._id !== activeUserId)
                    ._id
                }
              />
            ))}
        </div>
      )}
    </aside>
  );
}

export default SideBar;
