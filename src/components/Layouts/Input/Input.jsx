import styles from './input.module.scss';

function Input({
  onChange = () => {},
  value,
  defaultValue,
  type = 'text',
  id,
  label,
  className,
  name,
  placeholder = 'text',
}) {
  return (
    <div className={`${styles.inputFieldRe} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.inpLabel}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        className={styles.inp}
        value={defaultValue ? defaultValue : value}
      />
    </div>
  );
}

export default Input;
