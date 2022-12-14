import { useState } from "react";
import { useSelector } from "react-redux";

import {
  selectAboutProccessUpdate,
  selectAboutUpdateCredentials,
} from "../../../../store/selectors/aboutPageSelectors";
import { useAboutUserQuery } from "../../../../hooks";

import styles from "./styles/form.module.scss";
import { BTN, DatePicker, Input, TextField } from "../../../Layouts";

function UpdateEducation() {
  const updateCredentials = useSelector(selectAboutUpdateCredentials);
  const proccessUpdate = useSelector(selectAboutProccessUpdate);

  const [description, setDescription] = useState("");

  const { cancelHandler, handleConfirm, formRef } =
    useAboutUserQuery("education");

  return (
    <form
      className={styles.updateFormMain}
      ref={formRef}
      onSubmit={handleConfirm}
    >
      <h1 className={styles.formTitleUpdate}>
        {proccessUpdate ? "update" : "add"} your education info
      </h1>
      <Input
        placeholder="collage"
        className={styles.inpUpdate}
        defaultValue={updateCredentials?.collage}
        name="collage"
      />
      <Input
        placeholder="faculty"
        className={styles.inpUpdate}
        defaultValue={updateCredentials?.faculty}
        name="faculty"
      />
      <Input
        placeholder="degree"
        className={styles.inpUpdate}
        defaultValue={updateCredentials?.degree}
        name="degree"
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description..."
        className={styles.descriptionText}
        defaultValue={updateCredentials?.description}
        name="description"
      />
      <label>Study Years</label>
      <div className={styles.rowBox}>
        <div className={styles.columnBox}>
          <label>from</label>
          <DatePicker
            className={styles.picker}
            defaultDate={
              proccessUpdate
                ? new Date(updateCredentials?.years.from)
                : new Date()
            }
            name="from"
            id="from"
          />
        </div>
        <div className={styles.columnBox}>
          <label>to</label>
          <DatePicker
            className={styles.picker}
            defaultDate={
              proccessUpdate
                ? new Date(updateCredentials?.years.to)
                : new Date()
            }
            name="to"
            id="to"
          />
        </div>
        {/* <div className={styles.columnBox}>
          <input type='checkbox' id='currently' />
          <label htmlFor='currently'>currently study here</label>
        </div> */}
      </div>
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

export default UpdateEducation;
