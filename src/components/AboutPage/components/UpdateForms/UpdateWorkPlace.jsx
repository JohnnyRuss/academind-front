import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useUpdateUserInfo } from '../../../../hooks';

import styles from './styles/form.module.scss';
import { BTN, Input, TextField, DatePicker } from '../../../Interface';

function UpdateWorkPlace() {
  const { updateCredentials, proccessUpdate } = useSelector(({ aboutPage }) => aboutPage.dom);

  const [description, setDescription] = useState('');

  const { cancelHandler, handleConfirm, formRef } = useUpdateUserInfo('workplace');

  return (
    <form className={styles.updateFormMain} ref={formRef} onSubmit={handleConfirm}>
      <h1 className={styles.formTitleUpdate}>{proccessUpdate ? 'update' : 'add'} your workplace</h1>
      <Input
        placeholder='company'
        className={styles.inpUpdate}
        defaultValue={updateCredentials?.company}
        name='company'
      />
      <Input
        placeholder='position'
        className={styles.inpUpdate}
        defaultValue={updateCredentials?.position}
        name='position'
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='description...'
        className={styles.descriptionText}
        defaultValue={updateCredentials?.description}
        name='description'
      />
      <label>Working Years</label>
      <div className={styles.rowBox}>
        <div className={styles.columnBox}>
          <label>from</label>
          <DatePicker
            className={styles.picker}
            defaultDate={
              proccessUpdate ? new Date(updateCredentials?.workingYears.from) : new Date()
            }
            name='from'
            id='from'
          />
        </div>
        <div className={styles.columnBox}>
          <label>to</label>
          <DatePicker
            className={styles.picker}
            defaultDate={proccessUpdate ? new Date(updateCredentials?.workingYears.to) : new Date()}
            name='to'
            id='to'
          />
        </div>
        {/* <div className={styles.columnBox}>
          <input type='checkbox' id='currently' />
          <label htmlFor='currently'>currently work here</label>
        </div> */}
      </div>
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

export default UpdateWorkPlace;
