import { DislikeIcon } from '../../Icons/icons';

function LikeBTN({ reactOnPostHandler, dislikesAmount }) {
  return (
    <button data-reaction={false} onClick={reactOnPostHandler}>
      <DislikeIcon />
      <span>({dislikesAmount})</span>
    </button>
  );
}

export default LikeBTN;
