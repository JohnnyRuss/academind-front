import { useSelector } from "react-redux";

import styles from "./styles/education.module.scss";
import { EducationFragment } from "../../../Layouts";

function EducationDetails() {
  const userEducation = useSelector(
    ({ aboutUser }) => aboutUser.data?.education
  );

  return (
    <div className={styles.eduList}>
      {userEducation.map((edu) => (
        <EducationFragment data={edu} key={edu._id} editable={true} />
      ))}
    </div>
  );
}

export default EducationDetails;
