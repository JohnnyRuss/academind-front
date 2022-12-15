import { useSelector } from "react-redux";
import { LivingplaceFragment } from "../../../Layouts";

function LivingplaceDetails() {
  const currentLivingPlace = useSelector(
    ({ aboutUser }) => aboutUser.data?.currentLivingPlace
  );

  return <LivingplaceFragment data={currentLivingPlace} editable={true} />;
}

export default LivingplaceDetails;
