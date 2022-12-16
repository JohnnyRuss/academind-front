import { useState } from "react";
import { uid } from "uid";

import {
  ArrowDownRectingle,
  ArrowUpRectingle,
} from "../../Layouts/Icons/icons";
import styles from "./select.module.scss";

function Select({
  handler,
  data = {
    default: "",
    name: "",
    values: [],
  },
}) {
  const [active, setActive] = useState(false);
  const [defaultValue, setDefaultValue] = useState(data.default);
  const [fieldValue, setfieldValue] = useState("");

  function generateSelectionOptions() {
    const { name, values } = data;

    const temp = [];

    values?.forEach((val) =>
      temp.push({
        name,
        value: val,
        text: val[0].toUpperCase().concat(val.slice(1, val.length)),
      })
    );

    return temp;
  }

  function handleSelection(e) {
    const key = e.target.name;
    const value = e.target.dataset.value;

    if (defaultValue) setDefaultValue(null);

    setActive(false);
    setfieldValue(value);

    handler(value);
  }

  return (
    <div className={`${styles.selection} ${active ? styles.active : ""}`}>
      <button
        className={styles.selectDefault}
        onClick={(e) => {
          e.preventDefault();
          setActive((prevState) => !prevState);
        }}
      >
        <span className={defaultValue ? styles.default : ""}>
          {fieldValue || defaultValue}
        </span>
        {!active && <ArrowDownRectingle />}
        {active && <ArrowUpRectingle />}
      </button>
      {active && (
        <ul className={styles.selectionList}>
          {generateSelectionOptions()?.map((field) => (
            <li
              onClick={handleSelection}
              data-value={field.value}
              name={field.name}
              key={uid(6)}
            >
              {field.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
