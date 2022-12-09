/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";

import { IoContext } from "../../store/Io";

import {
  getAllConversations,
  getConversation,
  getLastConversation,
  resetConversation,
  deleteConversation,
  setNewMessage,
} from "../../store/reducers/conversationReducer";
import { selectUserId } from "../../store/selectors/userSelectors";
import { selectActiveConversation } from "../../store/selectors/conversationSelectors";

import MessangerContainer from "../../components/Messanger/MessangerContainer";
import SideBar from "../../components/Messanger/SideBar";
import Feed from "../../components/Messanger/Feed";

function Messanger() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { socket } = useContext(IoContext);

  const { conversation } = useSelector(selectActiveConversation);
  const { id: userId } = useSelector(selectUserId);

  /*
  fetches all conversations on components mount and resets them on component unmount 
  */
  useEffect(() => {
    dispatch(getAllConversations(userId));
    return () => dispatch(resetConversation());
  }, []);

  /* 
  this component is used in two cases 
  1. when user recently is redirected into the messanger and and the active conversation is not chosen yet Page fetches active user last conversation automaticaly with userID
  2. and when user stands on specific conversation. in that case conversation is fetched by conversationID
   */
  useEffect(() => {
    !id && dispatch(getLastConversation(userId));
    id && dispatch(getConversation(id));
  }, [id]);

  /* 
  delete conversatioon if it does not contains any messages
  this happens when user opens conversation from another user profile
  and  this conversation is empty
  */
  useEffect(() => {
    return () => {
      if (Object.values(conversation)[0] && !conversation.messages[0])
        dispatch(deleteConversation(conversation._id));
    };
  }, [conversation]);

  /*
  get new messages in real time
  */
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_new_message", (data) => {
      dispatch(setNewMessage(data));
    });
  }, [socket]);

  return (
    <MessangerContainer>
      <SideBar />
      {!id && <Feed />}
      <Outlet />
    </MessangerContainer>
  );
}

export default Messanger;
