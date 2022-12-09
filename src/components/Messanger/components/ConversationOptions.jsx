import { DotsHorizontalIcon, DeleteIcon } from "../../Layouts/Icons/icons";
import styles from "./styles/conversationOptions.module.scss";

function ConversationOptions({
  setOpenConversationOption,
  openConversationOption,
}) {
  return (
    <div className={styles.conversationOptions}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenConversationOption((prev) => !prev);
        }}
      >
        <DotsHorizontalIcon className={styles.dotBtn} />
      </button>
      {openConversationOption && (
        <div className={styles.optBtnBox}>
          <button
            className={styles.optBtn}
            onClick={(e) => {
              e.stopPropagation();
              setOpenConversationOption(false);
            }}
          >
            <DeleteIcon />
            <span>delete conversation</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ConversationOptions;
