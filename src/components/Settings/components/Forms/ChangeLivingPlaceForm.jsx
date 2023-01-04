/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableLivingPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import { Input, Error, BlockSpinner } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeLivingPlaceForm() {
  const {
    livingPlace,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableLivingPlace);

  const { handleResetLivingplace, handleCancel } = useSettings();
  const { addLivingPlaceQuery, livingPlaceError } = useSettingsQuery();

  const [country, setCountry] = useState(livingPlace.country);
  const [city, setCity] = useState(livingPlace.city);

  function handleUpdate() {
    addLivingPlaceQuery({ data: { country, city } });
  }

  useEffect(() => {
    return () => handleResetLivingplace();
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
          onChange={(e) => setCountry(e.target.value)}
          className={styles.inpField}
          error={livingPlaceError.country.hasError}
          message={livingPlaceError.country.message}
        />

        <Input
          type="text"
          name="city"
          label="city"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={livingPlaceError.city.hasError}
          message={livingPlaceError.city.message}
          className={styles.inpField}
        />
      </div>
      
      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}
      
      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetLivingplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeLivingPlaceForm;
