import styles from './spinner.module.scss';
import { SpinnerIcon } from '../../Layouts/Icons/icons';

function Spinner() {
  return <SpinnerIcon className={styles.spinner} />;
}

export default Spinner;
