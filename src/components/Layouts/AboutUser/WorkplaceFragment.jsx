import FragmentWrapper from "./FragmentWrapper";
import { CaseIcon } from "../Icons/icons";
import { formatDate } from "../../../lib";

function WorkplaceFragment({ data, editable }) {
  return (
    data && (
      <FragmentWrapper icon={<CaseIcon />} editable={editable}>
        <p>
          Worked in <strong>{data.company}</strong> as{" "}
          <strong>{data.position}</strong> from{" "}
          <strong>{formatDate(data.workingYears?.from, "verbal")}</strong> to{" "}
          <strong>{formatDate(data.workingYears?.to, "verbal")}</strong>
        </p>
        <p>{data.description}</p>
      </FragmentWrapper>
    )
  );
}

export default WorkplaceFragment;
