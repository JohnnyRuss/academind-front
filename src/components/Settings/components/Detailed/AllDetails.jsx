import EducationDetails from "./EducationDetails";
import BirthdateDetails from "./BirthdateDetails";
import LivingplaceDetails from "./LivingplaceDetails";
import WorkplaceDetails from "./WorkplaceDetails";
import BirthplaceDetails from "./BirthplaceDetails";

import styles from "../styles/detailed.module.scss";

function AllDetails() {
  return (
    <div className={styles.allDetailsContainer}>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>birthdate</h4>
        <BirthdateDetails editable={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>birthplace</h4>
        <BirthplaceDetails editable={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>livingplace</h4>
        <LivingplaceDetails editable={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>education</h4>
        <EducationDetails editable={false} />
      </div>
      <div>
        <h4 className={styles.settingsHeadingSecondary}>workplace</h4>
        <WorkplaceDetails editable={false} />
      </div>
    </div>
  );
}

export default AllDetails;
