import { useEffect, useRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';
import { groupMessages } from '../../lib/groupMessages';
import { fixLineBreaks } from '../../functions';

import styles from './components/styles/feed.module.scss';
import Message from './components/Message';
import { Avatar } from '../Interface';
import { TextArea } from '../Layouts';

function Feed({ conversation }) {
  const { id } = useSelector(selectUserId);
  const { conversationId } = useParams();
  const groupedMessages = groupMessages(conversation.messages);

  const adressat = useMemo(() => {
    return conversation.users.find((user) => user._id !== id);
  }, [conversation.users, id]);

  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [conversationId]);

  function handleMessage(text) {
    const val = fixLineBreaks(text);
    console.log(val)
  }

  return (
    <div className={styles.messangerFeedContainer}>
      <div className={styles.feedHeadingBox}>
        <Avatar img={adressat.profileImg} />
        <p className={styles.feedAuthor}>{adressat.userName}</p>
      </div>
      <div ref={chatRef} className={styles.feedContentBox}>
        {/* {groupedMessages.map((msgGroup, i) => (
          <Message
            key={`message ${i}`}
            msgGroup={msgGroup}
            activeUserId={id}
            adressatImage={adressat.profileImg}
          />
        ))} */}
      </div>
      <TextArea withBtn={false} placeholder='Aa' handler={handleMessage} />
    </div>
  );
}

export default Feed;
