import styles from './btn.module.scss';

/**
 * custom button which you can controll by props
 * @param {children} childrenJSX child elements
 * @param {function} onClick  onClick function
 * @param {String} className
 * @param {type} type by default = "button". defines button type
 * @returns
 */
function BTN({ children, onClick, className, type = 'button' }) {
  return (
    <button className={`${styles.btnRe} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default BTN;
