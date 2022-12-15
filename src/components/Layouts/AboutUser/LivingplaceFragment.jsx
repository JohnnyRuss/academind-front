import FragmentWrapper from "./FragmentWrapper";
import { LocationIcon } from "../Icons/icons";

function LivingplaceFragment({ data, editable }) {
  return (
    data && (
      <FragmentWrapper icon={<LocationIcon />} editable={editable}>
        <p>
          Live in <strong>{data.city}</strong> <strong>{data.country}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default LivingplaceFragment;
