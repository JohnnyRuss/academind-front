import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { EducationFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function EducationDetails({ editable }) {
  const userEducation = useSelector(
    ({ aboutUser }) => aboutUser.data?.education
  );

  const { handleEditingTarget, handleUpdateEducation } = useSettings();

  return (
    userEducation && (
      <div className={`${styles.listedContent} ${styles.fragmentsContainer}`}>
        {userEducation.map((edu) => (
          <EducationFragment
            data={edu}
            key={edu._id}
            deleteAble={true}
            editable={editable === false ? false : true}
            onEdit={() => {
              handleUpdateEducation(edu);
              handleEditingTarget(editableKeys.changeEducation);
            }}
          />
        ))}
      </div>
    )
  );
}

export default EducationDetails;
