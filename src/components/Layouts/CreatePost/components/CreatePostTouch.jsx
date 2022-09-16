import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFile } from '../../../../store/reducers/createPostReducer';
import { setUpdateFile } from '../../../../store/reducers/portalReducer';
import { selectActiveUserInfo } from '../../../../store/selectors/userSelectors';

import styles from './styles/createPostTouch.module.scss';
import { MultiMediaIcon } from '../../Icons/icons';
import { UserIdentifier } from '../../';

function CreatePostTouch({ setIsOpen, withTextField = true }) {
  const dispatch = useDispatch();

  const filesRef = useRef();

  const { updatePostModalIsOpen } = useSelector(({ portal }) => portal);
  const activeSelectedMedia = useSelector(({ createPost }) => createPost.activeSelectedMedia);
  const { userName, image, id } = useSelector(selectActiveUserInfo);

  const selectFiles = (e) => {
    if (!updatePostModalIsOpen) dispatch(setFile(e.target.files));
    if (updatePostModalIsOpen) dispatch(setUpdateFile(e.target.files));
  };

  useEffect(() => {
    if (!activeSelectedMedia) filesRef.current.value = null;
  }, [activeSelectedMedia]);

  return (
    <>
      {withTextField && (
        <>
          <UserIdentifier
            userId={id}
            userName={userName}
            img={image}
            withTime={false}
            className={styles.identifierPostTouch}
          />
          <input
            type='text'
            className={styles.touchInp}
            placeholder="what's on your mind ?"
            onClick={() => setIsOpen(true)}
          />
        </>
      )}
      <label className={styles.createPostFooter} htmlFor='postMediaFile'>
        <MultiMediaIcon /> / Media
        <input
          ref={filesRef}
          type='file'
          id='postMediaFile'
          name='postFiles'
          className={styles.mediaFileInp}
          onChange={selectFiles}
          multiple
        />
      </label>
    </>
  );
}

export default CreatePostTouch;
