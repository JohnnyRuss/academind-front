import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsOpen } from '../../../store/reducers/createPostReducer';
import { usePostQuery, useRestrictBodyOverflow } from '../../../hooks';

import styles from './components/styles/createPost.module.scss';
import { CreatePostTouch } from './components';
import CreatePostModal from './CreatePostModal';

function CreatePost({ className }) {
  const dispatch = useDispatch();
  const { restrictScroll } = useRestrictBodyOverflow();

  const [description, setDescriptionn] = useState('');

  const {
    isOpen,
    activeSelectedMedia,
    files,
    loadingState: { loading },
  } = useSelector(({ createPost }) => createPost);

  const { updatePostModalIsOpen } = useSelector(({ portal }) => portal);

  const handleDescription = (e) => setDescriptionn(e.target.value);

  const { handlePostPublish } = usePostQuery();

  const activateModal = (open) => !updatePostModalIsOpen && dispatch(setIsOpen(open));

  useEffect(() => {
    if (activeSelectedMedia) activateModal(true);
    if (isOpen) restrictScroll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSelectedMedia]);

  useEffect(() => {
    if (!isOpen) restrictScroll(false);
  }, [isOpen, restrictScroll]);

  return (
    <div className={`${styles.createPost} ${className || ''}`}>
      <CreatePostTouch setIsOpen={activateModal} />
      {isOpen && (
        <CreatePostModal
          isOpen={isOpen}
          loading={loading}
          setIsOpen={activateModal}
          handleDescription={handleDescription}
          handlePost={() =>
            handlePostPublish({ description, media: files, type: 'post', operationType: 'publish' })
          }
        />
      )}
    </div>
  );
}

export default CreatePost;
