import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { LivingplaceFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function BirthplaceDetails({ editable }) {
  const birthPlace = useSelector(({ aboutUser }) => aboutUser.data?.from);

  const { handleEditingTarget, handleUpdateBirthplace } = useSettings();

  return (
    birthPlace && (
      <div className={styles.fragmentsContainer}>
        <LivingplaceFragment
          data={birthPlace}
          editable={editable === false ? false : true}
          onEdit={() => {
            handleUpdateBirthplace(birthPlace);
            handleEditingTarget(editableKeys.changeBirthplace);
          }}
        />
      </div>
    )
  );
}

export default BirthplaceDetails;
