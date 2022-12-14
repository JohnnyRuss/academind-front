import { useSelector } from "react-redux";

import {
  selectAboutProccessUpdate,
  selectAboutUpdateCredentials,
} from "../../../../store/selectors/aboutPageSelectors";
import { useAboutUserQuery } from "../../../../hooks";

import styles from "./styles/form.module.scss";
import { SelectCountry, BTN, Input } from "../../../Layouts";

function UpdateBirthPlace() {
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
        {proccessUpdate ? "update" : "add"} your birthplace
      </h1>
      <SelectCountry
        className={styles.selectCountryUpdate}
        defaultValue={proccessUpdate ? updateCredentials?.country : ""}
        name="country"
      />
      <Input
        placeholder="city"
        className={styles.inpUpdate}
        defaultValue={proccessUpdate ? updateCredentials?.city : ""}
        name="city"
      />
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

export default UpdateBirthPlace;
