import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors.js';

import styles from './components/styles/sideBar.module.scss';
import { Link } from 'react-router-dom';
import Conversation from './components/Conversation';

function SideBar({ conversations }) {
  const { id } = useSelector(selectUserId);

  return (
    <aside className={styles.sideBar}>
      <div className={styles.contentBox}>
        {conversations.map((conversation) => (
          <Link to={`${conversation._id}`} key={conversation.id}>
            <Conversation
              author={conversation.users.find((user) => user._id !== id)}
              lastMessage={conversation.messages[0]}
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
