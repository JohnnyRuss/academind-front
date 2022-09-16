import { useSelector, useDispatch } from 'react-redux';

import { removeFiles } from '../../../../store/reducers/createPostReducer';
import { removeUpdateFiles } from '../../../../store/reducers/portalReducer';

import styles from './styles/createPostMedia.module.scss';
import { CloseXIcon, CloseIcon } from '../../Icons/icons';
import { Image } from '../../../Interface';

function CreatePostMedia() {
  const dispatch = useDispatch();

  const { isOpen, files: createPostFiles } = useSelector(({ createPost }) => createPost);

  const { updatePostModalIsOpen, updatePostMediaFiles } = useSelector(({ portal }) => portal);

  const files = isOpen ? createPostFiles : updatePostModalIsOpen ? updatePostMediaFiles : [];

  const handleDiscardMedia = (url) => {
    updatePostModalIsOpen && dispatch(removeUpdateFiles(url));
    isOpen && dispatch(removeFiles(url));
  };

  return (
    files[0] && (
      <>
        <div
          className={`${styles.postMediaBox} ${
            styles[`postMediaBox--${files?.length <= 5 ? files?.length : 'extra'}`]
          }`}>
          {Object.values(files)?.map((img) => (
            <div key={`${img.name}${img.lastModified}`} className={styles.imgBox}>
              <Image
                src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                className={styles.postMedia}
              />
              <button className={styles.discardMediaBtn} onClick={() => handleDiscardMedia(img)}>
                <CloseXIcon />
              </button>
            </div>
          ))}
          {files?.length > 5 && <p className={styles.extraImagesLayOver}>+{files?.length - 5}</p>}

          {files.length > 1 && (
            <button className={styles.discardAllMediaBtn} onClick={() => handleDiscardMedia('all')}>
              <CloseIcon />
              <span>discard all media</span>
            </button>
          )}
        </div>
      </>
    )
  );
}

export default CreatePostMedia;
