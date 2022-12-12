import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function Spinner() {
  return (
    <div className={styles.spinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default Spinner;
