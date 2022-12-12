import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import {
  selectActiveConversation,
  selectAllConversations,
} from "../../store/selectors/conversationSelectors";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { useConversationQuery } from "../../hooks";

import Feed from "../../components/Messanger/Feed";

let isValidConversation = true;

function MessangerFeed() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: conversationRoute } = useParams();

  const { deleteConversationQuery, markAsReadQuery } = useConversationQuery();

  const activeUserId = useSelector(selectActiveUserId);
  const { conversation } = useSelector(selectActiveConversation);
  const { allConversations } = useSelector(selectAllConversations);

  useEffect(() => {
    if (!conversation) return;

    const lastMsg = conversation.lastMessage;

    if (
      lastMsg.isRead ||
      conversationRoute !== conversation._id ||
      lastMsg.author === activeUserId
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
