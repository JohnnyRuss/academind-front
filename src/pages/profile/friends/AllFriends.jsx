/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetFriends } from '../../../store/reducers/friendsReducer';

import { AllFriends as Friends } from '../../../components/FriendsPage';

function AllFriends() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetFriends());
  }, []);

  return <Friends />;
}

export default AllFriends;
