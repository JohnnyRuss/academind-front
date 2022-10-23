import styles from "./styles/textInput.module.scss"
import { SendIcon } from '../../Layouts/Icons/icons';

function TextInput() {
  return (
    <form className={styles.inputBox}>
      <textarea placeholder='Aa' className={styles.textArea}/>
      <span className={styles.iconBox}>
        <SendIcon />
      </span>
    </form>
  );
}

export default TextInput;
