import { useDispatch } from 'react-redux';

import {
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
} from '../../store/reducers/friendsReducer';

function useFriendsQuery() {
  const dispatch = useDispatch();

  function sendFriendRequestHandler(userId) {
    dispatch(sendFriendRequest(userId));
  }

  function cancelFriendRequestHandler(userId) {
    dispatch(cancelFriendRequest(userId));
  }

  function deleteFriendRequestHandler(userId) {
    dispatch(deleteFriendRequest(userId));
  }

  function confirmFriendRequestHandler(userId) {
    dispatch(confirmFriendRequest(userId));
  }

  function deleteFriendHandler(userId) {
    dispatch(deleteFriend(userId));
  }

  return {
    sendFriendRequestHandler,
    cancelFriendRequestHandler,
    deleteFriendRequestHandler,
    confirmFriendRequestHandler,
    deleteFriendHandler,
  };
}

export default useFriendsQuery;
