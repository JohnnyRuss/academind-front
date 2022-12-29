import { useNavigate } from "react-router-dom";

import { Avatar, GoBackBTN } from "../../Layouts";
import styles from "./styles/feedHeader.module.scss";

function FeedHeader({ adressat }) {
  const navigate = useNavigate();

  return (
    <div className={styles.feedHeadingBox}>
      <Avatar img={adressat?.profileImg} />
      <GoBackBTN
        handler={() => navigate("/messanger")}
        className={styles.conversationGoBackBtn}
      />
      <p className={styles.feedAuthor}>
        {adressat?.userName || adressat?.cachedUserName}
      </p>
    </div>
  );
}

export default FeedHeader;
