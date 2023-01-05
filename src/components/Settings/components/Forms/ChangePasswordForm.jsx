import { useState } from "react";
import { useSelector } from "react-redux";

import { useSettingsQuery } from "../../../../hooks";
import { selectUpdateableStatus } from "../../../../store/selectors/settingsSelector";

import styles from "../styles/detailed.module.scss";
import { Input, BTN, BlockSpinner, Error } from "../../../Layouts";

function ChangePasswordForm(props) {
  const { loading, error, message } = useSelector(selectUpdateableStatus);

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { updatePasswordQuery } = useSettingsQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updatePasswordQuery({
          currPassword,
          newPassword,
        });
      }}
      className={styles.formsContainer}
    >
      
      <div className={`${styles.form} ${styles.passForm}`}>
        <Input
          placeholder="current password"
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
          type="password"
          name="currPassword"
          error={false}
          message={""}
          className={styles.inpField}
          id="password"
        />

        <Input
          placeholder="new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          name="newPassword"
          error={false}
          message={""}
          className={styles.inpField}
          id="newPassword"
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <BTN type="submit" className={styles.singleBtn}>
        update password
      </BTN>
    </form>
  );
}

export default ChangePasswordForm;
