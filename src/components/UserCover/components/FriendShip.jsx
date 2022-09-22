import { useEffect, useState } from 'react';

import { axiosQuery } from '../../../store/axiosConfig';

import styles from './styles/friendShip.module.scss';
import { DeleteBTN, CancelBTN, ConfirmBtn } from '../../Layouts';

function FriendShip() {
  const [friendShip, setFriendShip] = useState({
    isFriend: false,
    isPendingRequest: true,
    isSentRequest: true,
    isForeign: false,
  });

  return (
    <div className={styles.friendShipBTNBox}>
      {friendShip.isPendingRequest && <ConfirmBtn />}
      {friendShip.isPendingRequest && <DeleteBTN />}
      {friendShip.isSentRequest && <CancelBTN />}
    </div>
  );
}

export default FriendShip;
