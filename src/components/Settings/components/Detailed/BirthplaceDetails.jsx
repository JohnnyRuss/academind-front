import { useSelector } from "react-redux";
import { LivingplaceFragment } from "../../../Layouts";

function BirthplaceDetails() {
  const birthPlace = useSelector(({ aboutUser }) => aboutUser.data?.from);

  return <LivingplaceFragment data={birthPlace} editable={true} />;
}

export default BirthplaceDetails;
