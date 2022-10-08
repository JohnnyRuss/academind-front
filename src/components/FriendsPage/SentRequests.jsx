/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSentRequests } from '../../store/reducers/friendsReducer';
import { useRestrictPrivateRoute, useFriendsQuery } from '../../hooks';
import { selectUserId } from '../../store/selectors/userSelectors';

import styles from './components/styles/request.module.scss';
import { CancelRequestBTN } from '../Layouts';
import { Spinner } from '../Interface';
import RequestItemBody from './components/RequestItemBody';

function SentRequests() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUserId);

  useRestrictPrivateRoute();

  const { cancelFriendRequestHandler } = useFriendsQuery();

  const {
    loadingState: { loading },
    sentRequests,
    searchKey,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getSentRequests(id));
  }, []);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        sentRequests
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
              <CancelRequestBTN onClick={() => cancelFriendRequestHandler(adressat._id)} />
            </RequestItemBody>
          ))}
    </div>
  );
}

export default SentRequests;
