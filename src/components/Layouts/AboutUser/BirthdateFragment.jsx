import { CalendarIcon } from "../Icons/icons";
import FragmentWrapper from "./FragmentWrapper";
import { formatDate } from "../../../lib";

function BirthdateFragment({ data, editable }) {
  return (
    data && (
      <FragmentWrapper icon={<CalendarIcon />} editable={editable}>
        <p>
          Birthdate <strong>{formatDate(data, "verbal")}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default BirthdateFragment;
