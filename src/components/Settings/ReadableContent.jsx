import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectSettingsStatus } from "../../store/selectors/settingsSelector";
import { useSettings } from "../../hooks";

import { toRender } from "./config";
import ContentContainer from "./components/ContentContainer";
import styles from "./components/styles/detailed.module.scss";

function ReadableContent() {
  const { target, isEditing, headingTitle } = useSelector(selectSettingsStatus);

  const { handleResetEditingTarget } = useSettings();

  useEffect(() => {
    if (!isEditing) return;
    handleResetEditingTarget();
  }, [isEditing]);

  return (
    <ContentContainer>
      <h3 className={styles.settingsHeading}>{headingTitle}</h3>
      {toRender.detailed[target]}
    </ContentContainer>
  );
}

export default ReadableContent;
