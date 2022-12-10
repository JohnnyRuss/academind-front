import { useEffect, useRef, useState } from "react";

import styles from "./styles/feedMessagesList.module.scss";
import Message from "./Message";

function FeedMessagesList({ groupedMessages, adressat, activeUserId }) {
  const containerRef = useRef();
  const [lastGroupMsg, setLastGroupMsg] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [groupedMessages]);

  useEffect(() => {
    if (!groupedMessages[0]) return;

    const lastGroup = groupedMessages[groupedMessages.length - 1];
    setLastGroupMsg(lastGroup[lastGroup.length - 1]);
  }, [groupedMessages]);

  return (
    <div className={styles.feedContentBox} ref={containerRef}>
      {groupedMessages.map((msgGroup, i) => (
        <Message
          key={`message ${i}`}
          msgGroup={msgGroup}
          activeUserId={activeUserId}
          adressatImage={adressat.profileImg}
        />
      ))}
      {lastGroupMsg?.isRead && lastGroupMsg?.author === activeUserId && (
        <span className={styles.isReadLabel}>read</span>
      )}
    </div>
  );
}

export default FeedMessagesList;
