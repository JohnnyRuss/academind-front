import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useSettings } from "../../../hooks";
import { selectSettingsStatus } from "../../../store/selectors/settingsSelector";
import { editableKeysShort, detailedKeys } from "../config";

import styles from "./styles/editableList.module.scss";

function EditableList() {
  const { target, headingTitle, isEditing } = useSelector(selectSettingsStatus);
  const { handleMenuDetailedTarget, handleMenuEditableTarget } = useSettings();

  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    if (isMounting) return;

    localStorage.setItem(
      "settings-target",
      JSON.stringify({
        key: target,
        label: headingTitle,
      })
    );
  }, [target]);

  useEffect(() => {
    const lastTarget = localStorage.getItem("settings-target")
      ? JSON.parse(localStorage.getItem("settings-target"))
      : null;

    if (lastTarget) handleMenuDetailedTarget(false, lastTarget);
    else handleMenuDetailedTarget(false, { key: "showAll", label: "show all" });

    setIsMounting(false);
  }, []);

  return (
    <div className={styles.editableNavList}>
      {detailedKeys.map((detailedKey) => (
        <button
          onClick={() => handleMenuDetailedTarget(isEditing, detailedKey)}
          className={target === detailedKey.key ? styles.active : ""}
          key={detailedKey.id}
        >
          {detailedKey.label}
        </button>
      ))}
      {editableKeysShort.map((editableKey) => (
        <button
          onClick={() => handleMenuEditableTarget(editableKey)}
          className={target === editableKey.key ? styles.active : ""}
          key={editableKey.id}
        >
          {editableKey.label}
        </button>
      ))}
    </div>
  );
}

export default EditableList;
