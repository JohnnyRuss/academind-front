import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { selectUserId } from "../../store/selectors/userSelectors";
import { selectActiveConversation } from "../../store/selectors/conversationSelectors";
import { groupMessages } from "../../lib/groupMessages";
import { fixLineBreaks } from "../../functions";
import { sendMessage } from "../../store/reducers/conversationReducer";

import styles from "./components/styles/feed.module.scss";
import FeedHeader from "./components/FeedHeader";
import FeedMessagesList from "./components/FeedMessagesList";
import { Spinner } from "../Interface";
import { TextArea } from "../Layouts";

function Feed() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useSelector(selectUserId);

  const {
    conversation,
    loadingState: { loading },
  } = useSelector(selectActiveConversation);

  const groupedMessages = useMemo(
    () => groupMessages(conversation.messages),
    [conversation.messages]
  );

  const adressat = useMemo(() => {
    return conversation.users?.find((user) => user._id !== id);
  }, [conversation.users, id]);

  function handleMessage(text) {
    const val = fixLineBreaks(text);
    dispatch(sendMessage({ adressatId: adressat._id, body: { message: val } }));
  }

  function onFocusHandler() {
    if (pathname === "/messanger") navigate(`/messanger/${conversation._id}`);
  }

  return (
    <div className={styles.messangerFeedContainer}>
      {loading && <Spinner />}
      <FeedHeader adressat={adressat} />
      {!loading && Object.values(conversation)[0] && (
        <FeedMessagesList
          groupedMessages={groupedMessages}
          adressat={adressat}
          activeUserId={id}
        />
      )}
      <TextArea
        withBtn={false}
        placeholder="Aa"
        handler={handleMessage}
        onFocus={onFocusHandler}
      />
    </div>
  );
}

export default Feed;
