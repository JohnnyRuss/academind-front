import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserId } from "../../../store/selectors/userSelectors";

import styles from "./styles/conversation.module.scss";
import { Avatar } from "../../Interface";
import ConversationInfoBox from "./ConversationInfoBox";
import ConversationOptions from "./ConversationOptions";

function Conversation({ conversationId, adressatId, author, lastMessage }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const { id: activeUserId } = useSelector(selectUserId);

  const [openConversationOption, setOpenConversationOption] = useState(false);

  function handleNavigateToConversation() {
    navigate(conversationId);
  }

  return (
    <div
      onClick={() => handleNavigateToConversation()}
      onMouseLeave={() =>
        openConversationOption && setOpenConversationOption(false)
      }
      className={`${styles.conversationBox} ${
        conversationId === id && styles.activeConversationBox
      } ${
        !lastMessage?.isRead &&
        lastMessage?.author !== activeUserId &&
        styles.unRead
      }`}
      data-conversation-box
    >
      <Avatar img={author.profileImg} />
      <ConversationInfoBox
        userName={author.userName}
        lastMessage={lastMessage}
        lastMessagePrefix={lastMessage?.author === activeUserId}
      />
      <span className={styles.unReadDot}></span>
      <ConversationOptions
        openConversationOption={openConversationOption}
        setOpenConversationOption={setOpenConversationOption}
        conversationId={conversationId}
        adressatId={adressatId}
      />
    </div>
  );
}

export default Conversation;
