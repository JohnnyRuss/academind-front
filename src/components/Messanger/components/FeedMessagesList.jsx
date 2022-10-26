import styles from './styles/feedMessagesList.module.scss';
import Message from './Message';

function FeedMessagesList({ groupedMessages, adressat, activeUserId }) {
  return (
    <div className={styles.feedContentBox}>
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
