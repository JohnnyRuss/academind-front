/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setCreatePostIsOpen,
  addTag,
  removeTag,
  removeFiles,
  setText,
} from '../../../store/reducers/createPostReducer';
import { usePostQuery, useRestrictBodyOverflow } from '../../../hooks';

import styles from './components/styles/createPost.module.scss';
import { CreatePostTouch } from './components';
import CreatePostModal from './CreatePostModal';

function CreatePost({ className }) {
  const dispatch = useDispatch();

  const {
    createPostIsOpen,
    activeSelectedMedia,
    text,
    files,
    tags,
    loadingState: { loading },
  } = useSelector(({ createPost }) => createPost);

  const handleText = (txt) => dispatch(setText(txt));

  const handleTag = (tag) => dispatch(addTag(tag));

  const handleRemoveTag = (id) => dispatch(removeTag(id));

  const handleDiscardMedia = (url) => dispatch(removeFiles(url));

  const activateModal = (open) => dispatch(setCreatePostIsOpen(open));

  /*
   <CreatePostModal> uses <Modal> layout which one back in the hood uses this "useRestrictBodyOverflow" hook. <Modal> reactivates body overflow itself whenever it will be closed, but only if we click on the close button or on the backdrop. But here we are closing <CreatePostModal> e.i even <Modal> layout dinamicly whenever the post will finish creation, without pressing close button or backdrop and after this <Modal> itself can't reactivate body overflow itself anymore. Because of that we need to reactivate body overflow manually from there, again with help of useRestrictBodyOverflow hook. 
  */
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    /*
  user may not click into the <CreatePostTouch> text field and directly choose the media files. In that case <CreatePostTouch> component is responsible to set activeSelectedMedia to true. Here we are useing this property to dinamicly open <CreatePostModal> if there are chosen media files 
  */
    if (activeSelectedMedia) activateModal(true);
    if (createPostIsOpen) restrictScroll(false);
  }, [activeSelectedMedia]);

  useEffect(() => {
    if (!createPostIsOpen) restrictScroll(false);
  }, [createPostIsOpen, restrictScroll]);

  const { handlePostPublish } = usePostQuery();

  return (
    <div className={`${styles.createPost} ${className || ''}`}>
      <CreatePostTouch setIsOpen={activateModal} />
      {createPostIsOpen && (
        <CreatePostModal
          loading={loading}
          isOpen={createPostIsOpen}
          setIsOpen={activateModal}
          text={text}
          setText={handleText}
          tags={tags}
          handleTag={handleTag}
          handleRemoveTag={handleRemoveTag}
          files={files}
          handleDiscardMedia={handleDiscardMedia}
          handlePost={() =>
            handlePostPublish({
              operationType: 'publish',
              type: 'post',
              description: text,
              media: files,
              tags,
            })
          }
        />
      )}
    </div>
  );
}

export default CreatePost;
