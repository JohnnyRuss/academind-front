import { useSelector } from "react-redux";

import { useSettings } from "../../../../hooks";
import { editableKeys } from "../../config";

import { WorkplaceFragment } from "../../../Layouts";
import styles from "../styles/detailed.module.scss";

function WorkplaceDetails({ editable }) {
  const workplaces = useSelector(({ aboutUser }) => aboutUser.data?.workplace);

  const { handleEditingTarget, handleUpdateWorkplace } = useSettings();

  return (
    workplaces && (
      <div className={`${styles.listedContent} ${styles.fragmentsContainer}`}>
        {workplaces.map((workplace) => (
          <WorkplaceFragment
            data={workplace}
            key={workplace._id}
            deleteAble={true}
            editable={editable === false ? false : true}
            onEdit={() => {
              handleUpdateWorkplace(workplace);
              handleEditingTarget(editableKeys.changeWorkplace);
            }}
          />
        ))}
      </div>
    )
  );
}

export default WorkplaceDetails;
