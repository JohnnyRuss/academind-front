import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { LivingplaceFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function LivingplaceDetails({ editable }) {
  const currentLivingPlace = useSelector(
    ({ aboutUser }) => aboutUser.data?.currentLivingPlace
  );

  const { handleEditingTarget, handleUpdateLivingplace } = useSettings();

  return (
    currentLivingPlace && (
      <div className={styles.fragmentsContainer}>
        <LivingplaceFragment
          data={currentLivingPlace}
          editable={editable === false ? false : true}
          onEdit={() => {
            handleUpdateLivingplace(currentLivingPlace);
            handleEditingTarget(editableKeys.changeLivingplace);
          }}
        />
      </div>
    )
  );
}

export default LivingplaceDetails;
