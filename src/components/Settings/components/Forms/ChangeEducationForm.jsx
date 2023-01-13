/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectUpdateableEducation } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import {
  Input,
  TextField,
  DateForm,
  Error,
  BlockSpinner,
  Select,
} from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeEducationForm() {
  const {
    state: { operation, docId },
  } = useLocation();

  const {
    education,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableEducation);

  const { handleResetEducation, handleCancel } = useSettings();
  const { addEducationQuery, educationError } = useSettingsQuery();

  const [collage, setCollage] = useState(education.collage);
  const [faculty, setFaculty] = useState(education.faculty);
  const [degree, setDegree] = useState(education.degree);
  const [description, setDescription] = useState(education.description);

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
      collage,
      faculty,
      degree,
      description,
      years: {
        from: dateFrom,
        to: dateTo,
      },
    };

    addEducationQuery({ operation, data, docId });
  }

  useEffect(() => {
    return () => handleResetEducation();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.educationForm}`}>
        <Input
          type="text"
          name="collage"
          label="collage"
          placeholder="collage"
          value={collage}
          onChange={(e) => setCollage(e.target.value)}
          className={styles.inpField}
          error={educationError.collage.hasError}
          message={educationError.collage.message}
          id="collage"
        />

        <Input
          type="text"
          name="faculty"
          label="faculty"
          placeholder="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className={styles.inpField}
          error={educationError.faculty.hasError}
          message={educationError.faculty.message}
          id="faculty"
        />

        <Select
          label="degree"
          error={educationError.degree.hasError}
          message={educationError.degree.message}
          handler={(v) => setDegree(v)}
          data={{
            default: { label: degree || "degree", value: degree || "degree" },
            name: "degree",
            values: ["bachelor", "master", "doctor"],
          }}
        />

        <div className={styles.dateBox}>
          <DateForm
            handler={handleDateFrom}
            date={education.years?.from}
            label="date from"
            id="dateFrom"
          />
          <DateForm
            handler={handleDateTo}
            date={education.years?.to}
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
        cancelHandler={() => handleCancel(handleResetEducation)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeEducationForm;
