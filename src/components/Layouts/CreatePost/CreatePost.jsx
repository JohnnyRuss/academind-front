import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsOpen } from '../../../store/reducers/createPostReducer';
import { usePostQuery, useRestrictBodyOverflow } from '../../../hooks';

import styles from './components/styles/createPost.module.scss';
import { CreatePostTouch } from './components';
import CreatePostModal from './CreatePostModal';

function CreatePost({ className }) {
  const dispatch = useDispatch();

  const [description, setDescriptionn] = useState('');

  const {
    isOpen,
    activeSelectedMedia,
    files,
    loadingState: { loading },
  } = useSelector(({ createPost }) => createPost);

  /* 
  because of <CreatePostModal> is used from <CreatePost>(currentLocation) as well as <UpdatePostPortal> we need to prevent Modal duplication. So we have the condition which says if there are no updating process then go and open <CreatePostModal> for post creation(e.i for currentLocation)
  */
  const { updatePostModalIsOpen } = useSelector(({ portal }) => portal);
  const activateModal = (open) => !updatePostModalIsOpen && dispatch(setIsOpen(open));

  const handleDescription = (e) => setDescriptionn(e.target.value);

  const { handlePostPublish } = usePostQuery();

  /*
   <CreatePostModal> uses <Modal> layout which one back in the hood uses this "useRestrictBodyOverflow" hook. <Modal> reactivates body overflow itself whenever it will be closed, but only if we click on the close button or on the backdrop. But here we are closing <CreatePostModal> e.i even <Modal> layout dinamicly whenever the post will finish creation, without pressing close button or backdrop and after this <Modal> itself can't reactivate body overflow itself anymore. Because of that we need to reactivate body overflow manually from there, again with help of useRestrictBodyOverflow hook. 
  */
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    /*
  user may not click into the <CreatePostTouch> text field and directly choose the media files. So and that case <CreatePostTouch> component is responsible to set activeSelectedMedia to true. Here we are useing this property to dinamicly open <CreatePostModal> if there are chosen media files 
  */
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
      {isOpen && !updatePostModalIsOpen && (
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
