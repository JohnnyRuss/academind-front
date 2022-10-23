import MessangerContainer from '../../components/Messanger/MessangerContainer';
import SideBar from '../../components/Messanger/SideBar';
import Feed from '../../components/Messanger/Feed';

import { conversations } from '../../lib/conversations';

function Messanger() {
  const defaultConversation = conversations[0];
  return (
    <MessangerContainer>
      <SideBar conversations={conversations} />
      {true && <Feed conversation={defaultConversation} />}
    </MessangerContainer>
  );
}

export default Messanger;
