import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createPost, setIsOpen } from '../../../store/reducers/createPostReducer';
import { useRestrictBodyOverflow } from '../../../hooks';

import styles from './components/styles/createPost.module.scss';
import { CreatePostTouch } from './components';
import CreatePostModal from './CreatePostModal';

function CreatePost({ className, type = 'post' }) {
  const dispatch = useDispatch();
  const { restrictScroll } = useRestrictBodyOverflow();

  const [description, setDescriptionn] = useState('');

  const {
    isOpen,
    activeSelectedMedia,
    files,
    loadingState: { loading },
  } = useSelector(({ createPost }) => createPost);

  const handleDescription = (e) => setDescriptionn(e.target.value);

  const handlePostSubmit = () => dispatch(createPost({ description, type, images: files }));

  const activateModal = (open) => dispatch(setIsOpen(open));

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
          handlePost={handlePostSubmit}
        />
      )}
    </div>
  );
}

export default CreatePost;
