import { uid } from 'uid';
import { Image } from '../../../Interface';
import styles from './styles/postMedia.module.scss';

function PostMedia({ activateMedia, media, className }) {
  return (
    <div
      className={`${styles.postMediaBox} ${
        styles[`postMediaBox--${media?.length > 5 ? 'multi' : media?.length}`]
      }`}>
      {media.map((media, i, mediaArr) => (
        <Image
          onClick={() => activateMedia(i, mediaArr)}
          src={media}
          loading='lazy'
          className={`${styles.postMedia} ${className || ''}`}
          key={uid(6)}
        />
      ))}
      {media.length > 5 && (
        <span className={styles.multiLayOver} onClick={() => activateMedia(3)}>
          +{media.length - 5}
        </span>
      )}
    </div>
  );
}

export default PostMedia;
