import { useSelector } from 'react-redux';

import { useUpdateUserInfo } from '../../../../hooks';

import styles from './form.module.scss';
import { BTN, Input } from '../../../Interface';
// import { SelectCountry } from '../../../Layouts';

function UpdateBirthPlace() {
  const { proccessUpdate, updateCredentials } = useSelector(({ aboutPage }) => aboutPage);
  const { cancelHandler, handleConfirm, formRef } = useUpdateUserInfo();

  return (
    <form className={styles.updateFormMain} ref={formRef} onSubmit={handleConfirm}>
      <h1 className={styles.formTitleUpdate}>
        {proccessUpdate ? 'update' : 'add'} your birthplace
      </h1>
      {/* <SelectCountry
        className={styles.selectCountryUpdate}
        defaultValue={proccessUpdate ? updateCredentials.country : ''}
        name='country'
      /> */}
      <Input
        placeholder='city'
        className={styles.inpUpdate}
        defaultValue={proccessUpdate ? updateCredentials.city : ''}
        name='city'
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

export default UpdateBirthPlace;
