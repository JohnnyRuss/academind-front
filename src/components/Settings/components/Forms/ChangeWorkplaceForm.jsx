/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectUpdateableWorkplace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import {
  Input,
  TextField,
  DateForm,
  Error,
  BlockSpinner,
} from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeWorkplaceForm() {
  const {
    state: { operation, docId },
  } = useLocation();

  const {
    updateState: { loading, error, message },
    workplace,
  } = useSelector(selectUpdateableWorkplace);

  const { handleResetWorkplace, handleCancel } = useSettings();
  const { addWorkplaceQuery, workplaceError } = useSettingsQuery();

  const [company, setCompany] = useState(workplace.company);
  const [position, setPosition] = useState(workplace.position);
  const [description, setDescription] = useState(workplace.description);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function handleDateFrom(dateVal) {
    setDateFrom(dateVal);
  }

  function handleDateTo(dataVal) {
    setDateTo(dataVal);
  }

  function handleUpdate() {
    const data = {
      company,
      position,
      description,
      workingYears: {
        from: dateFrom,
        to: dateTo,
      },
    };

    addWorkplaceQuery({ operation, data, docId });
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
          error={workplaceError.company.hasError}
          message={workplaceError.company.message}
          id="company"
        />

        <Input
          type="text"
          name="position"
          label="position"
          placeholder="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={styles.inpField}
          id="position"
        />

        <div className={styles.dateBox}>
          <DateForm
            handler={handleDateFrom}
            date={workplace.workingYears?.from}
            label="date from"
            id="dateFrom"
          />
          <DateForm
            handler={handleDateTo}
            date={workplace.workingYears?.to}
            label="date to"
            id="dateTo"
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
            label="description"
            id="description"
          />
        </div>
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetWorkplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeWorkplaceForm;
