import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import styles from './components/styles/feed.module.scss';
import Message from './components/Message';
import TextInput from './components/TextInput';
import { Avatar } from '../Interface';

import { groupMessages } from '../../lib/groupMessages';

function Feed({ conversation }) {
  const { conversationId } = useParams();
  const activeUserId = 2;
  const groupedMessages = groupMessages(conversation.messages);

  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [conversationId]);
  console.log(conversation);
  return (
    <div className={styles.messangerFeedContainer}>
      <div className={styles.feedHeadingBox}>
        <Avatar img={conversation?.adressatImage} />
        <p className={styles.feedAuthor}>{conversation?.adressatName}</p>
      </div>
      <div ref={chatRef} className={styles.feedContentBox}>
        {groupedMessages.map((msgGroup, i) => (
          <Message
            key={`message ${i}`}
            msgGroup={msgGroup}
            activeUserId={activeUserId}
            adressatImage={conversation.adressatImage}
          />
        ))}
      </div>
      <TextInput />
    </div>
  );
}

export default Feed;
