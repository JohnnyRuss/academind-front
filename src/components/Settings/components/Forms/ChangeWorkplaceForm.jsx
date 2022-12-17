/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectWorkplace } from "../../../../store/selectors/settingsSelector";
import { useSettings } from "../../../../hooks";

import { Input, TextField } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import DateForm from "./DateForm";
import styles from "../styles/detailed.module.scss";

function ChangeWorkplaceForm() {
  const userWorkplace = useSelector(selectWorkplace);

  const { handleResetWorkplace, handleCancel } = useSettings();

  const [company, setCompany] = useState(userWorkplace.company);
  const [position, setPosition] = useState(userWorkplace.position);
  const [description, setDescription] = useState(userWorkplace.description);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function handleDateFrom(dateVal) {
    setDateFrom(dateVal);
  }

  function handleDateTo(dataVal) {
    setDateTo(dataVal);
  }

  function handleUpdate() {
    const dFrom = new Date(
      `${dateFrom.day}-${dateFrom.month}-${dateFrom.year}`
    );
    const dTo = new Date(`${dateTo.day}-${dateTo.month}-${dateTo.year}`);

    console.log({
      company,
      position,
      description,
      dFrom,
      dTo,
    });
  }

  useEffect(() => {
    return () => handleResetWorkplace();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.workplaceForm}`}>
        <Input
          type="text"
          name="company"
          label="company"
          placeholder="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={styles.inpField}
        />
        <Input
          type="text"
          name="position"
          label="position"
          placeholder="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={styles.inpField}
        />
        <div className={styles.dateFrom}>
          <DateForm
            handler={handleDateFrom}
            date={userWorkplace.workingYears?.from}
          />
        </div>
        <div className={styles.dateTo}>
          <DateForm
            handler={handleDateTo}
            date={userWorkplace.workingYears?.to}
          />
        </div>
        <div className={styles.description}>
          <TextField
            minRows={4}
            maxRows={8}
            className={styles.textFieldDesc}
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetWorkplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeWorkplaceForm;
