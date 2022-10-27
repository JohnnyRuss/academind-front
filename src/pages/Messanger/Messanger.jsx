/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Outlet } from 'react-router-dom';

import { socket } from '../../store/socket';
import {
  getAllConversations,
  getConversation,
  getLastConversation,
  resetConversation,
  deleteConversation,
} from '../../store/reducers/conversationReducer';
import { selectUserId } from '../../store/selectors/userSelectors';
import { selectActiveConversation } from '../../store/selectors/conversationSelectors';

import MessangerContainer from '../../components/Messanger/MessangerContainer';
import SideBar from '../../components/Messanger/SideBar';
import Feed from '../../components/Messanger/Feed';

function Messanger() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { conversation } = useSelector(selectActiveConversation);
  const { id: userId } = useSelector(selectUserId);

  useEffect(() => {
    dispatch(getAllConversations(userId));

    socket.on('test', (data) => {
      console.log(data);
    });

    return () => dispatch(resetConversation());
  }, []);

  useEffect(() => {
    !id && dispatch(getLastConversation(userId));
    id && dispatch(getConversation(id));
  }, [id]);

  useEffect(() => {
    return () => {
      if (Object.values(conversation)[0] && !conversation.messages[0])
        dispatch(deleteConversation(conversation._id));
    };
  }, [conversation]);

  return (
    <MessangerContainer>
      <SideBar />
      {!id && <Feed />}
      <Outlet />
    </MessangerContainer>
  );
}

export default Messanger;
