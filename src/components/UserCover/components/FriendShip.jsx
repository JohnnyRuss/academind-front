import styles from './styles/friendShip.module.scss';
import {
  DeleteRequestBTN,
  CancelRequestBTN,
  ConfirmRequestBtn,
  SendRequestBTN,
  IsFriendBTN,
  SendMessageBTN,
} from '../../Layouts';

function FriendShip({ friendShip }) {
  return (
    <div className={styles.friendShipBTNBox}>
      {friendShip?.isFriend && <IsFriendBTN />}
      {friendShip?.isForeign && <SendRequestBTN />}
      {friendShip?.isPendingRequest && <ConfirmRequestBtn />}
      {friendShip?.isPendingRequest && <DeleteRequestBTN />}
      {friendShip?.isSentRequest && <CancelRequestBTN />}
      <SendMessageBTN />
    </div>
  );
}

export default FriendShip;
