import { useState } from "react";
import styles from "./dateForm.module.scss";

function DateForm({ handler = () => {}, date, label, id }) {
  const [currDate, setCurrDate] = useState(date || undefined);

  return (
    <div className={styles.dateField}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="date"
        id={label ? id : ""}
        value={currDate ? createDateStr(new Date(currDate)) : ""}
        onChange={(e) => {
          setCurrDate(e.target.value);
          handler(new Date(e.target.value));
        }}
      />
    </div>
  );
}

export default DateForm;

function createDateStr(date) {
  if (!date) return;
  return date.toISOString().slice(0, 10);
}
