import { useDispatch, useSelector } from "react-redux";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import {
  // API Tasks
  markAsRead,
  getAllConversations,
  getLastConversation,
  getConversation,
  getNewConversation,
  deleteConversation,
  sendMessage,
  // Non API Tasks
  resetConversation,
  setNewMessage,
  setMarkAsRead,
  resetConversationChatError,
} from "../../store/reducers/conversationReducer";

function useConversationQuery(props) {
  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  // API Tasks
  function markAsReadQuery({ conversationId, adressatId }) {
    dispatch(markAsRead({ conversationId, adressatId }));
  }

  function getAllConversationsQuery() {
    dispatch(getAllConversations(activeUserId));
  }

  function getLastConversationQuery() {
    dispatch(getLastConversation(activeUserId));
  }

  function getConversationQuery(id) {
    dispatch(getConversation(id));
  }

  function getNewConversationQuery(newConversationId) {
    dispatch(getNewConversation(newConversationId));
  }

  function deleteConversationQuery(conversationId) {
    dispatch(deleteConversation(conversationId));
  }

  function sendMessageQuery({ adressatId, conversationId, body }) {
    dispatch(sendMessage({ adressatId, conversationId, body }));
  }

  // Non API Tasks
  function handleResetConversations() {
    dispatch(resetConversation());
  }

  function handleSetNewMessage(data) {
    dispatch(setNewMessage(data));
  }

  function handleMarkAsRead(data) {
    dispatch(setMarkAsRead(data));
  }

  function handleResetChatError() {
    dispatch(resetConversationChatError());
  }

  return {
    // API Tasks
    markAsReadQuery,
    getAllConversationsQuery,
    getLastConversationQuery,
    getConversationQuery,
    getNewConversationQuery,
    deleteConversationQuery,
    sendMessageQuery,
    // Non API Tasks
    handleResetConversations,
    handleSetNewMessage,
    handleMarkAsRead,
    handleResetChatError,
  };
}

export default useConversationQuery;
