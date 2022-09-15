import styles from './components/request.module.scss';
import { CancelBTN } from '../Layouts';
import RequestItemBody from './components/RequestItemBody';

function SentRequests() {
  return (
    <div className={styles.requestsList}>
      <RequestItemBody>
        <CancelBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
      <RequestItemBody>
        <CancelBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
      <RequestItemBody>
        <CancelBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
    </div>
  );
}

export default SentRequests;
