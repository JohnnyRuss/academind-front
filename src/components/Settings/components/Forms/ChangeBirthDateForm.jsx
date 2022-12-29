/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectBirthDate } from "../../../../store/selectors/settingsSelector";
import { useSettings } from "../../../../hooks";

import UpdateButtons from "./UpdateButtons";
import {DateForm} from "../../../Layouts"
import styles from "../styles/detailed.module.scss";

function ChangeBirthDateForm() {
  const [selectedDate, setSelectedDate] = useState();

  const userBirthDate = useSelector(selectBirthDate);

  const { handleResetBirthdate, handleCancel } = useSettings();

  function dateHandler(dateVal) {
    setSelectedDate(dateVal);
  }

  function handleUpdate() {
    const date = new Date(
      `${selectedDate.day}-${selectedDate.month}-${selectedDate.year}`
    );
    console.log(date);
  }

  useEffect(() => {
    return () => handleResetBirthdate();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={styles.form}>
        <DateForm handler={dateHandler} date={userBirthDate} />
      </div>
      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetBirthdate)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeBirthDateForm;
