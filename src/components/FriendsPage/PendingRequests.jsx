import styles from './components/request.module.scss';
import { DeleteBTN, ConfirmBtn } from '../Layouts';
import RequestItemBody from './components/RequestItemBody';

function PendingRequests() {
  return (
    <div className={styles.requestsList}>
      <RequestItemBody>
        <DeleteBTN />
        <ConfirmBtn />
      </RequestItemBody>
      <RequestItemBody>
        <DeleteBTN />
        <ConfirmBtn />
      </RequestItemBody>
    </div>
  );
}

export default PendingRequests;
