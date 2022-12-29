/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectEducation } from "../../../../store/selectors/settingsSelector";
import { useSettings } from "../../../../hooks";

import { Input, TextField } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import {DateForm} from "../../../Layouts"
import styles from "../styles/detailed.module.scss";

function ChangeEducationForm() {
  const userEducation = useSelector(selectEducation);

  const { handleResetEducation, handleCancel } = useSettings();

  const [collage, setCollage] = useState(userEducation.collage);
  const [faculty, setFaculty] = useState(userEducation.faculty);
  const [degree, setDegree] = useState(userEducation.degree);
  const [description, setDescription] = useState(userEducation.description);

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
      collage,
      faculty,
      degree,
      dFrom,
      dTo,
      description,
    });
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
        />
        <Input
          type="text"
          name="faculty"
          label="faculty"
          placeholder="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className={styles.inpField}
        />
        <Input
          type="text"
          name="degree"
          label="degree"
          placeholder="degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className={styles.inpField}
        />
        <div className={styles.dateFrom}>
          <DateForm handler={handleDateFrom} date={userEducation.years?.from} />
        </div>
        <div className={styles.dateTo}>
          <DateForm handler={handleDateTo} date={userEducation.years?.to} />
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
        cancelHandler={() => handleCancel(handleResetEducation)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeEducationForm;
