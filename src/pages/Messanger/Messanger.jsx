import { useEffect, useContext, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoContext } from "../../store/Io";
import { useConversationQuery } from "../../hooks";

import MessangerContainer from "../../components/Messanger/MessangerContainer";
import SideBar from "../../components/Messanger/SideBar";
import Feed from "../../components/Messanger/Feed";

function Messanger() {
  const { socket } = useContext(IoContext);

  const { id } = useParams();
  const [isMounting, setIsMounting] = useState(true);
  const loading = useSelector(
    (state) => state.conversation.loadingState.loading
  );

  const {
    // API Tasks
    getAllConversationsQuery,
    getLastConversationQuery,
    getConversationQuery,
    // Non API Tasks
    handleResetConversations,
    handleSetNewMessage,
    handleMarkAsRead,
  } = useConversationQuery();

  /*
  fetches all conversations on components mount and resets them on component unmount 
  */
  useEffect(() => {
    setIsMounting(false);
    getAllConversationsQuery();
    return () => handleResetConversations();
  }, []);

  /* 
  this component is used in two cases 
  1. when user recently is redirected into the messanger and and the active conversation is not chosen yet Page fetches active user last conversation automaticaly with userID
  2. and when user stands on specific conversation. in that case conversation is fetched by conversationID
   */
  useEffect(() => {
    !id && getLastConversationQuery();
    id && getConversationQuery(id);
  }, [id]);

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
