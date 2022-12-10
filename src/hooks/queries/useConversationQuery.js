import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/selectors/userSelectors";
import {
  // API Tasks
  markAsRead,
  getAllConversations,
  getLastConversation,
  getConversation,
  deleteConversation,
  sendMessage,
  // Non API Tasks
  resetConversation,
  setNewMessage,
  setMarkAsRead,
} from "../../store/reducers/conversationReducer";

function useConversationQuery(props) {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(selectUserId);

  // API Tasks
  function markAsReadQuery({ conversationId, adressatId }) {
    dispatch(markAsRead({ conversationId, adressatId }));
  }

  function getAllConversationsQuery() {
    dispatch(getAllConversations(userId));
  }

  function getLastConversationQuery() {
    dispatch(getLastConversation(userId));
  }

  function getConversationQuery(id) {
    dispatch(getConversation(id));
  }

  function deleteConversationQuery(conversationId) {
    dispatch(deleteConversation(conversationId));
  }

  function sendMessageQuery({ adressatId, body }) {
    dispatch(sendMessage({ adressatId, body }));
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

  return {
    // API Tasks
    markAsReadQuery,
    getAllConversationsQuery,
    getLastConversationQuery,
    getConversationQuery,
    deleteConversationQuery,
    sendMessageQuery,
    // Non API Tasks
    handleResetConversations,
    handleSetNewMessage,
    handleMarkAsRead,
  };
}

export default useConversationQuery;
