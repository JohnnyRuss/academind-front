import { useDispatch, useSelector } from "react-redux";

import {
  setTarget,
  setIsEditing,
  resetIsEditing,
} from "../../../store/reducers/settingsReducer";
import { selectSettingsStatus } from "../../../store/selectors/settingsSelector";
import { editableKeysShort, detailedKeys } from "../config";

import styles from "./styles/editableList.module.scss";

function EditableList() {
  const dispatch = useDispatch();

  const { target, isEditing } = useSelector(selectSettingsStatus);

  return (
    <div className={styles.editableNavList}>
      {editableKeysShort.map((editableKey) => (
        <button
          onClick={() => {
            dispatch(setTarget(editableKey.key));
            dispatch(setIsEditing(editableKey.key));
          }}
          className={target === editableKey.key ? styles.active : ""}
          key={editableKey.id}
        >
          {editableKey.label}
        </button>
      ))}
      {detailedKeys.map((detailedKey) => (
        <button
          onClick={() => {
            isEditing && dispatch(resetIsEditing());
            dispatch(setTarget(detailedKey.key));
          }}
          className={target === detailedKey.key ? styles.active : ""}
          key={detailedKey.id}
        >
          {detailedKey.label}
        </button>
      ))}
    </div>
  );
}

export default EditableList;
