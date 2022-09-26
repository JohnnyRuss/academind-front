import { useFriendsQuery } from '../../../hooks';

import styles from './styles/friendShip.module.scss';
import {
  DeleteRequestBTN,
  CancelRequestBTN,
  ConfirmRequestBtn,
  SendRequestBTN,
  IsFriendBTN,
  SendMessageBTN,
} from '../../Layouts';

function FriendShip({ friendShip, profileId, setFriendShip }) {
  const {
    sendFriendRequestHandler,
    cancelFriendRequestHandler,
    deleteFriendRequestHandler,
    confirmFriendRequestHandler,
    deleteFriendHandler,
  } = useFriendsQuery();

  return (
    <div className={styles.friendShipBTNBox}>
      {friendShip?.isFriend && (
        <IsFriendBTN
          deleteHanlder={() => {
            deleteFriendHandler(profileId);
            setFriendShip((prev) => ({ ...prev, isFriend: false, isForeign: true }));
          }}
        />
      )}
      {friendShip?.isForeign && (
        <SendRequestBTN
          onClick={() => {
            sendFriendRequestHandler(profileId);
            setFriendShip((prev) => ({ ...prev, isSentRequest: true, isForeign: false }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <ConfirmRequestBtn
          onClick={() => {
            confirmFriendRequestHandler(profileId);
            setFriendShip((prev) => ({ ...prev, isPendingRequest: false, isFriend: true }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <DeleteRequestBTN
          onClick={() => {
            deleteFriendRequestHandler(profileId);
            setFriendShip((prev) => ({ ...prev, isPendingRequest: false, isForeign: true }));
          }}
        />
      )}
      {friendShip?.isSentRequest && (
        <CancelRequestBTN
          onClick={() => {
            cancelFriendRequestHandler(profileId);
            setFriendShip((prev) => ({ ...prev, isSentRequest: false, isForeign: true }));
          }}
        />
      )}
      <SendMessageBTN />
    </div>
  );
}

export default FriendShip;