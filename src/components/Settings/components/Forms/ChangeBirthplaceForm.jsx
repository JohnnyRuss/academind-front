/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableBirthPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import { Input, Error, BlockSpinner } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeBirthplaceForm() {
  const {
    birthPlace,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableBirthPlace);

  const { handleResetBirthplace, handleCancel } = useSettings();
  const { addBirthPlaceQuery, livingPlaceError } = useSettingsQuery();

  const [country, setCountry] = useState(birthPlace.country);
  const [city, setCity] = useState(birthPlace.city);

  function handleUpdate() {
    addBirthPlaceQuery({ data: { country, city } });
  }

  useEffect(() => {
    return () => handleResetBirthplace();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.livingPlaceForm}`}>
        <Input
          type="text"
          name="country"
          label="country"
          placeholder="country"
          value={country}
          className={styles.inpField}
          onChange={(e) => setCountry(e.target.value)}
          error={livingPlaceError.country.hasError}
          message={livingPlaceError.country.message}
          id="country"
        />

        <Input
          type="text"
          name="city"
          label="city"
          placeholder="city"
          value={city}
          className={styles.inpField}
          onChange={(e) => setCity(e.target.value)}
          error={livingPlaceError.city.hasError}
          message={livingPlaceError.city.message}
          id="city"
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetBirthplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeBirthplaceForm;
