/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPendingRequests } from '../../store/reducers/friendsReducer';

import styles from './components/request.module.scss';
import { DeleteRequestBTN, ConfirmRequestBtn } from '../Layouts';
import { Spinner } from '../Interface';
import RequestItemBody from './components/RequestItemBody';

function PendingRequests() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loadingState: { loading },
    pendingRequests,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getPendingRequests(id));
  }, []);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        pendingRequests.map(({ adressat }) => (
          <RequestItemBody
            key={adressat._id}
            img={adressat.profileImg}
            userName={adressat.userName}
            userId={adressat._id}>
            <DeleteRequestBTN />
            <ConfirmRequestBtn />
          </RequestItemBody>
        ))}
    </div>
  );
}

export default PendingRequests;
