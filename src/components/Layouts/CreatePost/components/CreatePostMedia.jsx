import { useSelector, useDispatch } from 'react-redux';
import { uid } from 'uid';

import { removeFiles } from '../../../../store/reducers/createPostReducer';

import styles from './createPostMedia.module.scss';
import { CloseIcon } from '../../Icons/icons';
import { Image } from '../../../Interface';

function CreatePostMedia() {
  const dispatch = useDispatch();

  const imgs = useSelector(({ createPost }) => createPost.file);
  const handleDiscardMedia = (url) => dispatch(removeFiles(url));

  return (
    imgs[0] && (
      <>
        <div
          className={`${styles.postMediaBox} ${
            styles[`postMediaBox--${imgs?.length <= 5 ? imgs?.length : 'extra'}`]
          }`}>
          {Object.values(imgs)?.map((img) => (
            <div key={uid(6)} className={styles.imgBox}>
              <Image
                src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                className={styles.postMedia}
              />
              <button className={styles.discardMediaBtn} onClick={() => handleDiscardMedia(img)}>
                <CloseIcon />
              </button>
            </div>
          ))}
          {imgs?.length > 5 && <p className={styles.extraImagesLayOver}>+{imgs?.length - 5}</p>}

          <button className={styles.discardAllMediaBtn} onClick={() => handleDiscardMedia('all')}>
            <CloseIcon />
            <span>discard all media</span>
          </button>
        </div>
      </>
    )
  );
}

export default CreatePostMedia;
