import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./styles/conversation.module.scss";
import { Avatar } from "../../Interface";

import ConversationInfoBox from "./ConversationInfoBox";
import ConversationOptions from "./ConversationOptions";

function Conversation({ author, conversationId, lastMessage }) {
  const { id } = useParams();

  const [openConversationOption, setOpenConversationOption] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(conversationId)}
      onMouseLeave={() =>
        openConversationOption && setOpenConversationOption(false)
      }
      className={`${styles.conversationBox} ${
        conversationId === id && styles.activeConversationBox
      } ${false && styles.unRead}`}
      data-conversation-box
    >
      <Avatar img={author.profileImg} />
      <ConversationInfoBox
        userName={author.userName}
        lastMessage={lastMessage}
      />
      <span className={styles.unReadDot}></span>
      <ConversationOptions
        openConversationOption={openConversationOption}
        setOpenConversationOption={setOpenConversationOption}
      />
    </div>
  );
}

export default Conversation;
