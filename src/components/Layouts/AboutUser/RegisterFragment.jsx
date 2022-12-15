import FragmentWrapper from "./FragmentWrapper";
import { RotateIcon } from "../Icons/icons";

function RegisterFragment({ data, editable }) {
  return (
    data && (
      <FragmentWrapper icon={<RotateIcon />} editable={editable}>
        <p>
          Joined at <strong>{data}</strong>
        </p>
      </FragmentWrapper>
    )
  );
}

export default RegisterFragment;
