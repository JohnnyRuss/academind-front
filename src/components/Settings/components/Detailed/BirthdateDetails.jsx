import { useSelector } from "react-redux";
import { BirthdateFragment } from "../../../Layouts";

function BirthdateDetails() {
  const birthDate = useSelector(({ aboutUser }) => aboutUser.data?.birthDate);

  return <BirthdateFragment data={birthDate} editable={true} />;
}

export default BirthdateDetails;
