/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPendingRequests } from '../../store/reducers/friendsReducer';
import { useRestrictPrivateRoute, useFriendsQuery } from '../../hooks';

import styles from './components/styles/request.module.scss';
import { DeleteRequestBTN, ConfirmRequestBtn } from '../Layouts';
import { Spinner } from '../Interface';
import RequestItemBody from './components/RequestItemBody';

function PendingRequests() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useRestrictPrivateRoute();

  const { confirmFriendRequestHandler, deleteFriendRequestHandler } = useFriendsQuery();

  const {
    loadingState: { loading },
    pendingRequests,
    searchKey,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getPendingRequests(id));
  }, []);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        pendingRequests
          .filter((adressat) => {
            if (!searchKey) return adressat;
            else return adressat.userName.includes(searchKey);
          })
          .map((adressat) => (
            <RequestItemBody
              key={adressat._id}
              img={adressat.profileImg}
              userName={adressat.userName}
              userId={adressat._id}
              muntuals={adressat.muntuals}>
              <DeleteRequestBTN onClick={() => deleteFriendRequestHandler(adressat._id)} />
              <ConfirmRequestBtn onClick={() => confirmFriendRequestHandler(adressat._id)} />
            </RequestItemBody>
          ))}
    </div>
  );
}

export default PendingRequests;
