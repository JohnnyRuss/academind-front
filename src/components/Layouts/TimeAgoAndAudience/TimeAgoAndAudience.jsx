import { TimeAgo } from "../../Interface";
import Audience from "../Audience/Audience";

import styles from "./timeAgoAndAudience.module.scss"

function TimeAgoAndAudience({ timeAgo, audience }) {
  return (
    <div className={styles.timeAndAudience}>
      <TimeAgo date={timeAgo} className={styles.dateTimeAgo} />
      <Audience audience={audience} />
    </div>
  );
}

export default TimeAgoAndAudience;