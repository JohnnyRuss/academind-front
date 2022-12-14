import styles from './textField.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

function TextField({
  minRows = 2,
  maxRows = 5,
  value,
  defaultValue = '',
  placeholder = 'text',
  onChange = () => {},
  className,
  name,
  focus = false,
}) {
  return (
    <TextareaAutosize
      // minRows={minRows}
      rows={minRows}
      maxRows={maxRows}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autoFocus={focus}
      className={`${styles.textArea} ${className ? className : ''}`}
      value={defaultValue ? defaultValue : value}
    />
  );
}

export default TextField;
