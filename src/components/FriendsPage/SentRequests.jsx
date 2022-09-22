import styles from './components/request.module.scss';
import { CancelRequestBTN } from '../Layouts';
import RequestItemBody from './components/RequestItemBody';

function SentRequests() {
  return (
    <div className={styles.requestsList}>
      <RequestItemBody>
        <CancelRequestBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
      <RequestItemBody>
        <CancelRequestBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
      <RequestItemBody>
        <CancelRequestBTN className={styles.cancelReqBtn} />
      </RequestItemBody>
    </div>
  );
}

export default SentRequests;
