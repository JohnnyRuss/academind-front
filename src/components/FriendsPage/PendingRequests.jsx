import styles from './components/request.module.scss';
import { DeleteRequestBTN, ConfirmRequestBtn } from '../Layouts';
import RequestItemBody from './components/RequestItemBody';

function PendingRequests() {
  return (
    <div className={styles.requestsList}>
      <RequestItemBody>
        <DeleteRequestBTN />
        <ConfirmRequestBtn />
      </RequestItemBody>
      <RequestItemBody>
        <DeleteRequestBTN />
        <ConfirmRequestBtn />
      </RequestItemBody>
    </div>
  );
}

export default PendingRequests;
