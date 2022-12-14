import { useSelector } from "react-redux";

import styles from "./styles/userInfo.module.scss";
import { BasicInfoBlock, EduBlock, AboutNav } from "./";
import { Spinner } from "../../../Layouts";

/**
 * this is the AboutPage left side root which one contains and ties together left side navigation and his blocks-: basic info block and education block
 * @param {Object} userInfo object which one contains the user info
 * @returns
 */
function UserInfo({ userInfo }) {
  const navTarget = useSelector(({ aboutPage }) => aboutPage.dom.navTarget);
  const { loading } = useSelector(({ aboutPage }) => aboutPage.loadingState);

  return (
    <div className={styles.userInfo}>
      <AboutNav />
      {loading && <Spinner />}
      {!loading && (
        <>
          {navTarget === "basics" && <BasicInfoBlock userInfo={userInfo} />}
          {navTarget === "edu" && <EduBlock userInfo={userInfo} />}
        </>
      )}
    </div>
  );
}

export default UserInfo;
