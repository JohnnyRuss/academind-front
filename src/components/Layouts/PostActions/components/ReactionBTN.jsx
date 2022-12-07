import { DislikeIcon, LikeIcon } from "../../Icons/icons";

function ReactionBTN({
  reactOnPostHandler,
  reactionsAmount,
  reaction,
  isUserInteracted,
}) {
  const p =
    isUserInteracted === reaction
      ? { "data-user-liked": "data-user-interacted" }
      : "";
  return (
    <button
      {...p}
      data-reaction={reaction}
      onClick={reactOnPostHandler}
    >
      {reaction ? <LikeIcon /> : <DislikeIcon />}
      <span>({reactionsAmount})</span>
    </button>
  );
}

export default ReactionBTN;
