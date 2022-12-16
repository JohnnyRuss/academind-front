import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectLivingPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings } from "../../../../hooks";

import { Input } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeLivingPlaceForm() {
  const userLivingPlace = useSelector(selectLivingPlace);

  const { handleResetLivingplace, handleCancel } = useSettings();

  const [country, setCountry] = useState(userLivingPlace.country);
  const [city, setCity] = useState(userLivingPlace.city);

  function handleUpdate() {
    console.log({
      country,
      city,
    });
  }

  useEffect(() => {
    return () => handleResetLivingplace();
  }, []);

  return (
    <form className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.birthPlaceForm}`}>
        <Input
          type="text"
          name="country"
          label="country"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          type="text"
          name="city"
          label="city"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetLivingplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeLivingPlaceForm;
