import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableCurrentWorkplace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";
import { USER_WORKPLACE_POSITIONS } from "../../../../lib/config";

import {
  Input,
  Select,
  TextField,
  BlockSpinner,
  Error,
} from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

function ChangeCurrentWorkplaceForm() {
  const {
    updateState: { loading, error, message },
    currentWorkplace,
  } = useSelector(selectUpdateableCurrentWorkplace);

  const [institution, setInstitution] = useState(currentWorkplace.institution);
  const [position, setPosition] = useState(currentWorkplace.position);
  const [description, setDescription] = useState(currentWorkplace.description);

  const { handleResetCurrentWorkplace, handleCancel } = useSettings();

  const { updateCurrentWorkplaceQuery, currentWorkPlaceError } =
    useSettingsQuery();

  function handleUpdate() {
    const data = {
      institution,
      position,
      description,
    };

    updateCurrentWorkplaceQuery({ data });
  }

  return (
    <form className={styles.formsContainer}>
      <div className={`${styles.form} ${styles.workplaceForm}`}>
        <Input
          type="text"
          name="institution"
          label="institution"
          placeholder="institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className={styles.inpField}
          error={currentWorkPlaceError.institution.hasError}
          message={currentWorkPlaceError.institution.message}
          id="company"
        />

        <Select
          label="position"
          error={currentWorkplace.position.hasError}
          message={currentWorkPlaceError.position.message}
          handler={(val) => setPosition(val)}
          data={{
            default: currentWorkplace.position || "position",
            name: "position",
            values: USER_WORKPLACE_POSITIONS,
          }}
        />

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
            error={currentWorkPlaceError.description.hasError}
            message={currentWorkPlaceError.description.message}
          />
        </div>
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetCurrentWorkplace)}
        updateHandler={handleUpdate}
      />
    </form>
  );
}

export default ChangeCurrentWorkplaceForm;
