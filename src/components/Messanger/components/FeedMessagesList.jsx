import { useEffect, useRef } from "react";

import styles from "./styles/feedMessagesList.module.scss";
import Message from "./Message";

function FeedMessagesList({ groupedMessages, adressat, activeUserId }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
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
    </div>
  );
}

export default FeedMessagesList;
