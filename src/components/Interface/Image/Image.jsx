import styles from './img.module.scss';

function Image({ src, className, alt, onClick = () => {} }) {
  return (
    <figure className={`${styles.imgRe} ${className || ''}`} onClick={() => onClick(src)} data-img>
      <img src={src} alt={alt} />
    </figure>
  );
}

export default Image;
