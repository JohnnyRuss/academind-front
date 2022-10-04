import { LikeIcon } from '../../Icons/icons';

function LikeBTN({ reactOnPostHandler, likesAmount }) {
  return (
    <button data-reaction={true} onClick={reactOnPostHandler}>
      <LikeIcon />
      <span>({likesAmount})</span>
    </button>
  );
}

export default LikeBTN;
