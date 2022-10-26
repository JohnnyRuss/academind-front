import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors.js';
import { selectAllConversations } from '../../store/selectors/conversationSelectors.js';

import styles from './components/styles/sideBar.module.scss';
import Conversation from './components/Conversation';

function SideBar() {
  const { id } = useSelector(selectUserId);
  const conversations = useSelector(selectAllConversations);

  return (
    <aside className={styles.sideBar}>
      <div className={styles.contentBox}>
        {conversations?.map((conversation) => (
          <Conversation
            key={conversation._id}
            author={conversation.users.find((user) => user._id !== id)}
            lastMessage={conversation.messages[0]}
            conversationId={conversation._id}
          />
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
