/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSentRequests } from '../../store/reducers/friendsReducer';

import styles from './components/request.module.scss';
import { CancelRequestBTN } from '../Layouts';
import { Spinner } from '../Interface';
import RequestItemBody from './components/RequestItemBody';

function SentRequests() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loadingState: { loading },
    sentRequests,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getSentRequests(id));
  }, []);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        sentRequests.map(({ adressat }) => (
          <RequestItemBody
            key={adressat._id}
            img={adressat.profileImg}
            userName={adressat.userName}
            userId={adressat._id}>
            <CancelRequestBTN />
          </RequestItemBody>
        ))}
    </div>
  );
}

export default SentRequests;
