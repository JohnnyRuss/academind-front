/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectNewConversationAlert,
  selectAllConversations,
  selectConversationLoadingState,
} from "../../store/selectors/conversationSelectors";
import { selectMessageCount } from "../../store/selectors/badgeSelectors";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { IoContext } from "../../store/Io";
import { useConversationQuery, useBadgeQuery } from "../../hooks";

import MessangerContainer from "../../components/Messanger/MessangerContainer";
import SideBar from "../../components/Messanger/SideBar";
import Feed from "../../components/Messanger/Feed";

function Messanger() {
  const { socket } = useContext(IoContext);

  const activeUserId = useSelector(selectActiveUserId);

  const { id } = useParams();
  const [isMounting, setIsMounting] = useState(true);
  const { loading } = useSelector(selectConversationLoadingState);

  const { allConversations, allConversationState } = useSelector(
    selectAllConversations
  );

  const { isNew, id: newConversationId } = useSelector(
    selectNewConversationAlert
  );

  const unseenConversationsCount = useSelector(selectMessageCount);

  const {
    // API Tasks
    getAllConversationsQuery,
    getLastConversationQuery,
    getConversationQuery,
    getNewConversationQuery,
    // Non API Tasks
    handleResetConversations,
    handleSetNewMessage,
    handleMarkAsRead,
  } = useConversationQuery();

  const { resetUnseenConversationsCountQuery } = useBadgeQuery();

  /*
  fetches all conversations on components mount and resets them on component unmount 
  */
  useEffect(() => {
    setIsMounting(false);
    getAllConversationsQuery();
    return () => handleResetConversations();
  }, []);

  useEffect(() => {
    if (
      !allConversationState.error &&
      !allConversationState.loading &&
      !isMounting &&
      unseenConversationsCount > 0
    )
      resetUnseenConversationsCountQuery(activeUserId);
  }, [allConversationState.loading]);

  /* 
  this component is used in two cases 
  1. when user recently is redirected into the messanger and and the active conversation is not chosen yet Page fetches active user last conversation automaticaly with userID
  2. and when user stands on specific conversation. in that case conversation is fetched by conversationID
   */
  useEffect(() => {
    !id &&
      !allConversationState.loading &&
      !allConversationState.error &&
      allConversations[0] &&
      getLastConversationQuery();

    id && getConversationQuery(id);
  }, [id, allConversationState.loading]);

  useEffect(() => {
    if (!isNew) return;
    getNewConversationQuery(newConversationId);
  }, [isNew]);

  /*
  get new messages in real time
  */
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_new_message", (data) => {
      handleSetNewMessage(data);
    });

    socket.on("receive_message_isRead", (data) => {
      handleMarkAsRead(data);
    });
  }, [socket]);

  return (
    <MessangerContainer>
      <SideBar />
      {!isMounting && !loading && (
        <>
          {!id && <Feed />}
          <Outlet />
        </>
      )}
    </MessangerContainer>
  );
}

export default Messanger;
