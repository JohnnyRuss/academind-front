import { useSelector } from "react-redux";
import { WorkplaceFragment } from "../../../Layouts";

function WorkplaceDetails() {
  const workplaces = useSelector(({ aboutUser }) => aboutUser.data?.workplace);

  return (
    <div>
      {workplaces.map((workplace) => (
        <WorkplaceFragment
          data={workplace}
          key={workplace._id}
          editable={true}
        />
      ))}
    </div>
  );
}

export default WorkplaceDetails;
