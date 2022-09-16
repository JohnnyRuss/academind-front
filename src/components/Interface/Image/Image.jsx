// import styles from './img.module.scss';

function Image({ src, loading = 'eager', className, alt, onClick = () => {} }) {
  return (
    <figure className={`${className || ''}`} onClick={() => onClick(src)} data-img>
      <img src={src} alt={alt} loading={loading} />
    </figure>
  );
}

export default Image;
