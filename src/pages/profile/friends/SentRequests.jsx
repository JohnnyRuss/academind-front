/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetFriends } from '../../../store/reducers/friendsReducer';

import { useRestrictPrivateRoute } from '../../../hooks';
import { SentRequests as Requests } from '../../../components/FriendsPage';

function SentRequests() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetFriends());
  }, []);

  return <Requests />;
}

export default SentRequests;
