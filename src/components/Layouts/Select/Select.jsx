import { useState } from 'react';
import { uid } from 'uid';

import styles from './select.module.scss';
import { ArrowDownRectingle, ArrowUpRectingle } from '../../Layouts/Icons/icons';

function Select({
  data = {
    default: 'Birds',
    name: 'birds',
    values: ['1 bird', '2 bird', '3 bird', '4 bird', '5 bird', '6 bird'],
  },
}) {
  const [active, setActive] = useState(false);
  const [defaultValue, setDefaultValue] = useState(data.default);
  const [fieldValue, setfieldValue] = useState('');

  function generateSelectionOptions(data) {
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
  }

  return (
    <div className={styles.selectionRe}>
      <button
        className={`${styles.selectDefault} ${active ? styles.active : ''}`}
        onClick={() => setActive((prevState) => !prevState)}>
        <span className={defaultValue ? styles.default : ''}>{fieldValue || defaultValue}</span>
        {!active && <ArrowDownRectingle />}
        {active && <ArrowUpRectingle />}
      </button>
      {active && (
        <ul className={styles.selectionList}>
          {generateSelectionOptions(data)?.map((field) => (
            <li onClick={handleSelection} data-value={field.value} name={field.name} key={uid(6)}>
              {field.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
