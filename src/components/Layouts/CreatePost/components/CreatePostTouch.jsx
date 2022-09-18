import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFile } from '../../../../store/reducers/createPostReducer';
import { setUpdateFile } from '../../../../store/reducers/portalReducer';
import { selectActiveUserInfo } from '../../../../store/selectors/userSelectors';

import styles from './styles/createPostTouch.module.scss';
import { MultiMediaIcon } from '../../Icons/icons';
import { UserIdentifier } from '../../';

/**
 * is component which one firstly communicates to the user, so the component which is represented before modal open
 * @param {boolean} withTextField by default true. if true returns component with textfield if false returns only the media button, actually footer of itself
 * @returns
 */
function CreatePostTouch({ setIsOpen, withTextField = true }) {
  const dispatch = useDispatch();

  const filesRef = useRef();

  const activeSelectedMedia = useSelector(({ createPost }) => createPost.activeSelectedMedia);
  const { userName, image, id } = useSelector(selectActiveUserInfo);

  /*
  <CreatePostTouch> is attached directly to the <CreatePost> and because of <CreatePost> uses <CreatePostModal> as well as <UpdatePostPortal> we need to prevent incorect or unnecessary data set. So we have the condition which says if there's going updating process then go and set media files for post update state(e.i for <UpdatePostPortal>), otherwise set files for create post state (e.i for <CreatePost>)
  */
  const { updatePostModalIsOpen } = useSelector(({ portal }) => portal);
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
