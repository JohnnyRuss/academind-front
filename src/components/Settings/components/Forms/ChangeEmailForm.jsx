import { useState } from "react";
import { useSelector } from "react-redux";

import { useSettingsQuery } from "../../../../hooks";
import { selectUpdateableStatus } from "../../../../store/selectors/settingsSelector";

import styles from "../styles/detailed.module.scss";
import { Input, BTN, BlockSpinner, Error } from "../../../Layouts";

function ChangeEmailForm(props) {
  const { loading, error, message } = useSelector(selectUpdateableStatus);

  const [currEmail, setCurrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { updateEmailQuery } = useSettingsQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateEmailQuery({
          currEmail,
          password,
          newEmail,
        });
      }}
      className={styles.formsContainer}
    >
      
      <div className={`${styles.form} ${styles.passForm}`}>
        <Input
          placeholder="email"
          value={currEmail}
          onChange={(e) => setCurrEmail(e.target.value)}
          type="email"
          name="currEmail"
          error={false}
          message={""}
          className={styles.inpField}
        />

        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          error={false}
          message={""}
          className={styles.inpField}
        />

        <Input
          placeholder="new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          type="email"
          name="newEmail"
          error={false}
          message={""}
          className={styles.inpField}
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <BTN type="submit" className={styles.singleBtn}>
        update email
      </BTN>
    </form>
  );
}

export default ChangeEmailForm;
