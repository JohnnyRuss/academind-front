/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Outlet } from 'react-router-dom';

import {
  getAllConversations,
  getConversation,
  getLastConversation,
} from '../../store/reducers/conversationReducer';
import { selectUserId } from '../../store/selectors/userSelectors';

import MessangerContainer from '../../components/Messanger/MessangerContainer';
import SideBar from '../../components/Messanger/SideBar';
import Feed from '../../components/Messanger/Feed';

function Messanger() {
  const { id } = useParams();
  const { id: userId } = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConversations(userId));
  }, []);

  useEffect(() => {
    !id && dispatch(getLastConversation(userId));
    id && dispatch(getConversation(id));
  }, [id]);

  return (
    <MessangerContainer>
      <SideBar />
      {!id && <Feed />}
      <Outlet />
    </MessangerContainer>
  );
}

export default Messanger;
