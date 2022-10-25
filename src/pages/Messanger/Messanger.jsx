import MessangerContainer from '../../components/Messanger/MessangerContainer';
import SideBar from '../../components/Messanger/SideBar';
import Feed from '../../components/Messanger/Feed';

import allConversations from "../../lib/all-conversations.json"
import conv from "../../lib/conv.json"

function Messanger() {
  return (
    <MessangerContainer>
      <SideBar conversations={allConversations} />
      {true && <Feed conversation={conv} />}
    </MessangerContainer>
  );
}

export default Messanger;
