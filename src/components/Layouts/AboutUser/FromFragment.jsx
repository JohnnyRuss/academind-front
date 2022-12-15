import FragmentWrapper from "./FragmentWrapper";
import { LocationIcon } from "../Icons/icons";

function FromFragment({ data, editable }) {
  return (
    data && (
      <FragmentWrapper icon={<LocationIcon />} editable={editable}>
        <p>
          From <strong>{data}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default FromFragment;
