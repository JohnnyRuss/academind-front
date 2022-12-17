/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

import { selectSettingsStatus } from "../../../store/selectors/settingsSelector";

import styles from "./styles/content.module.scss";
import { toRender } from "../config";

function ContentContainer({ children }) {
  const { target, editableTarget, isEditing } =
    useSelector(selectSettingsStatus);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content}>
        {children}
        {/* {isEditing ? toRender.forms[editableTarget] : toRender.detailed[target]} */}
      </div>
    </div>
  );
}

export default ContentContainer;
