/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetFriends } from '../../../store/reducers/friendsReducer';
import { useRestrictPrivateRoute } from '../../../hooks';
import { PendingRequests } from '../../../components/FriendsPage';

function PendingRequest() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetFriends());
  }, []);

  return <PendingRequests />;
}

export default PendingRequest;
