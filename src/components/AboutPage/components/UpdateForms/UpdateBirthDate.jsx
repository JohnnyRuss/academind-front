import { useSelector } from "react-redux";

import {
  selectAboutProccessUpdate,
  selectAboutUpdateCredentials,
} from "../../../../store/selectors/aboutPageSelectors";
import { useAboutUserQuery } from "../../../../hooks";

import styles from "./styles/form.module.scss";
import { BTN, DatePicker } from "../../../Layouts";

function UpdateBirthDate() {
  const updateCredentials = useSelector(selectAboutUpdateCredentials);
  const proccessUpdate = useSelector(selectAboutProccessUpdate);

  const { cancelHandler, handleConfirm, formRef } = useAboutUserQuery();

  return (
    <form
      className={styles.updateFormMain}
      ref={formRef}
      onSubmit={handleConfirm}
    >
      <h1 className={styles.formTitleUpdate}>
        {proccessUpdate ? "update" : "add"} your birthdate
      </h1>
      {updateCredentials.birthDate && (
        <DatePicker
          defaultDate={
            proccessUpdate ? new Date(updateCredentials?.birthDate) : new Date()
          }
          name="birthDate"
          id="birthDate"
        />
      )}
      <div className={styles.btnBox}>
        <BTN className={styles.secondaryBtnUpdate} onClick={cancelHandler}>
          cancel
        </BTN>
        <BTN className={styles.primaryBtnUpdate} type="submit">
          confirm
        </BTN>
      </div>
    </form>
  );
}

export default UpdateBirthDate;
