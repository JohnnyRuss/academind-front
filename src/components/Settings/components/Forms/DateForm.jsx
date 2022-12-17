/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { Select } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function days() {
  const temp = [];

  for (let i = 0; i < 31; i++) {
    temp.push(`${i + 1}`);
  }
  return temp;
}

function years() {
  const currYear = new Date().getFullYear();

  const temp = [];

  for (let i = currYear - 100; i < currYear; i++) {
    temp.push(`${i + 1}`);
  }

  return temp;
}

function destructureDate(date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const day = d.getDay();
  const month = d.getMonth();

  return { year, day, month };
}

function DateForm({ handler = () => {}, date }) {
  const [day, setDay] = useState(destructureDate(date).day);
  const [month, setMonth] = useState(months[destructureDate(date).month]);
  const [year, setYear] = useState(destructureDate(date).year);

  useEffect(() => {
    handler({
      day,
      month,
      year,
    });
  }, [day, month, year]);

  return (
    <>
      <div className={styles.dateField}>
        <label>day</label>
        <Select
          handler={(val) => setDay(val)}
          data={{
            values: days(),
            default: day || "day",
            name: "day",
          }}
        />
      </div>
      <div className={styles.dateField}>
        <label>month</label>
        <Select
          handler={(val) => setMonth(val)}
          data={{
            values: months,
            default: month || "month",
            name: "month",
          }}
        />
      </div>
      <div className={styles.dateField}>
        <label>year</label>
        <Select
          handler={(val) => setYear(val)}
          data={{
            values: years().reverse(),
            default: year || "years",
            name: "year",
          }}
        />
      </div>
    </>
  );
}

export default DateForm;
