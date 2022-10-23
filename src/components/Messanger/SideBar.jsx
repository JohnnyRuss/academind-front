import styles from './components/styles/sideBar.module.scss';
import { Link } from 'react-router-dom';
import Conversation from './components/Conversation';

function SideBar({ conversations }) {
  return (
    <aside className={styles.sideBar}>
      <div className={styles.contentBox}>
        {conversations.map((conversation) => (
          <Link to={`${conversation.id}`} key={conversation.id}>
            <Conversation
              author={conversation.adressatName}
              authorImage={conversation.adressatImage}
              message={conversation.messages[conversation.messages.length - 1].text}
              timeAgo='2h'
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
