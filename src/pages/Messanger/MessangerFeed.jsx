import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  selectActiveConversation,
  selectAllConversations,
} from "../../store/selectors/conversationSelectors";
import { selectUserId } from "../../store/selectors/userSelectors";
import { useConversationQuery } from "../../hooks";

import { getConversationLastMsg } from "../../lib";

import Feed from "../../components/Messanger/Feed";

let isValidConversation = true;

function MessangerFeed() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { deleteConversationQuery, markAsReadQuery } = useConversationQuery();

  const { id: activeUserId } = useSelector(selectUserId);
  const { conversation } = useSelector(selectActiveConversation);
  const { allConversations } = useSelector(selectAllConversations);

  useEffect(() => {
    const lastMsg = getConversationLastMsg(conversation);

    if (!lastMsg) return;
    else if (
      lastMsg.author === activeUserId ||
      (lastMsg.author !== activeUserId && lastMsg.isRead)
    )
      return;

    markAsReadQuery({
      conversationId: conversation._id,
      adressatId: lastMsg.author,
    });
  }, [conversation?.messages]);

  useEffect(() => {
    if (!state?.isNew || conversation?.messages[0]) return;
    if (!conversation?.messages[0]) isValidConversation = false;
  }, [conversation?.messages]);

  /* 
  delete conversatioon if it does not contains any messages
  this happens when user opens conversation from another user profile
  and  this conversation is empty
  */
  useEffect(() => {
    return () =>
      state?.isNew &&
      !isValidConversation &&
      deleteConversationQuery(conversation?._id);
  }, []);

  useEffect(() => {
    if (!allConversations?.[0] && !conversation) {
      navigate("/messanger", { replace: true });
    }
  }, [allConversations, conversation]);

  return <Feed />;
}

export default MessangerFeed;
