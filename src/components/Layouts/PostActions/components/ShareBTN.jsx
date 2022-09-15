import { ShareIcon } from '../../../Layouts/Icons/icons';

function ShareBTN({ shareHandler }) {
  return (
    <button onClick={shareHandler}>
      <ShareIcon />
    </button>
  );
}

export default ShareBTN;
