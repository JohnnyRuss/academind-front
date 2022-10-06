import { FriendIcon, PublicIcon, LockIcon } from '../Icons/icons';

const audienceBlock = {
  public: <PublicIcon />,
  friends: <FriendIcon />,
  private: <LockIcon />,
};

function Audience({ audience }) {
  return <>{audienceBlock[audience]}</>;
}

export default Audience;
