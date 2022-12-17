import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { BirthdateFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function BirthdateDetails({ editable }) {
  const birthDate = useSelector(({ aboutUser }) => aboutUser.data?.birthDate);

  const { handleEditingTarget, handleUpdateBirthdate } = useSettings();

  return (
    birthDate && (
      <div className={styles.fragmentsContainer}>
        <BirthdateFragment
          data={birthDate}
          editable={editable === false ? false : true}
          onEdit={() => {
            handleEditingTarget(editableKeys.changeBirthdate);
            handleUpdateBirthdate(birthDate);
          }}
        />
      </div>
    )
  );
}

export default BirthdateDetails;
