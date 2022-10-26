import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';
import { selectActiveConversation } from '../../store/selectors/conversationSelectors';
import { groupMessages } from '../../lib/groupMessages';
import { fixLineBreaks } from '../../functions';

import styles from './components/styles/feed.module.scss';
import FeedHeader from './components/FeedHeader';
import FeedMessagesList from './components/FeedMessagesList';
import { Spinner } from '../Interface';
import { TextArea } from '../Layouts';

function Feed() {
  const { id } = useSelector(selectUserId);

  const {
    conversation,
    loadingState: { loading },
  } = useSelector(selectActiveConversation);

  const groupedMessages = groupMessages(conversation.messages);

  const adressat = useMemo(() => {
    return conversation.users?.find((user) => user._id !== id);
  }, [conversation.users, id]);

  function handleMessage(text) {
    const val = fixLineBreaks(text);
    console.log(val);
  }

  return (
    <div className={styles.messangerFeedContainer}>
      {loading && <Spinner />}
      <FeedHeader adressat={adressat} />
      {!loading && Object.values(conversation)[0] && (
        <FeedMessagesList groupedMessages={groupedMessages} adressat={adressat} activeUserId={id} />
      )}
      <TextArea withBtn={false} placeholder='Aa' handler={handleMessage} />
    </div>
  );
}

export default Feed;
