import { useSelector } from 'react-redux';

import { useUpdateUserInfo } from '../../../../hooks';

import styles from './form.module.scss';
import { DatePicker, BTN } from '../../../Interface';

function UpdateBirthDate() {
  const { updateCredentials, proccessUpdate } = useSelector(({ aboutPage }) => aboutPage);
  const { cancelHandler, handleConfirm, formRef } = useUpdateUserInfo();

  return (
    <form className={styles.updateFormMain} ref={formRef} onSubmit={handleConfirm}>
      <h1 className={styles.formTitleUpdate}>{proccessUpdate ? 'update' : 'add'} your birthdate</h1>
      <DatePicker
        defaultDate={proccessUpdate ? new Date(updateCredentials.birthDate) : new Date()}
        name='birthDate'
        id='birthDate'
      />
      <div className={styles.btnBox}>
        <BTN className={styles.secondaryBtnUpdate} onClick={cancelHandler}>
          cancel
        </BTN>
        <BTN className={styles.primaryBtnUpdate} type='submit'>
          confirm
        </BTN>
      </div>
    </form>
  );
}

export default UpdateBirthDate;
