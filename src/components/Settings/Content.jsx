import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectSettingsStatus } from "../../store/selectors/settingsSelector";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import useAboutUserQuery from "../../hooks/queries/useAboutUserQuery";

import styles from "./components/styles/content.module.scss";
import { toRender } from "./config";

function Content() {
  const { target, editableTarget, isEditing } =
    useSelector(selectSettingsStatus);
  const activeUserId = useSelector(selectActiveUserId);

  const { getAboutUserQuery } = useAboutUserQuery();

  useEffect(() => {
    getAboutUserQuery(activeUserId);
  }, []);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content}>
        {isEditing ? toRender.forms[editableTarget] : toRender.detailed[target]}
      </div>
    </div>
  );
}

export default Content;
