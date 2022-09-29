/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  resetUpdatePostModal,
  addUpdateTag,
  removeUpdateTag,
  removeUpdateFiles,
} from '../../store/reducers/portalReducer';
import { usePostQuery, useRestrictBodyOverflow } from '../../hooks';

import { CreatePostModal } from '../Layouts';

function UpdatePostPortal() {
  const dispatch = useDispatch();

  const {
    updatePostModalIsOpen,
    updatePostData,
    updatePostMediaFiles,
    updatePostLoadingState: { loading },
  } = useSelector(({ portal }) => portal);

  const { description, tags } = updatePostData;

  const [text, setText] = useState(description);

  const handleTag = (tag) => dispatch(addUpdateTag(tag));

  const handleRemoveTag = (id) => dispatch(removeUpdateTag(id));

  const handleDiscardMedia = (url) => dispatch(removeUpdateFiles(url));

  const deactivateHandler = () => dispatch(resetUpdatePostModal());

  /*
   <CreatePostModal> uses <Modal> layout which one back in the hood uses this "useRestrictBodyOverflow" hook. <Modal> reactivates body overflow itself whenever it will be closed, but only if we click on the close button or on the backdrop. But here we are closing <CreatePostModal> e.i even <Modal> layout dinamicly whenever the post will finish creation, without pressing close button or backdrop and after this <Modal> itself can't reactivate body overflow itself anymore. Because of that we need to reactivate body overflow manually from there, again with help of useRestrictBodyOverflow hook. 
  */
  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  const { handlePostPublish } = usePostQuery();

  return (
    updatePostModalIsOpen && (
      <CreatePostModal
        loading={loading}
        isOpen={updatePostModalIsOpen}
        setIsOpen={deactivateHandler}
        text={text}
        setText={setText}
        tags={tags}
        handleTag={handleTag}
        handleRemoveTag={handleRemoveTag}
        files={updatePostMediaFiles}
        handleDiscardMedia={handleDiscardMedia}
        updateCredentials={updatePostData}
        handlePost={() =>
          handlePostPublish({
            operationType: 'update',
            description: text,
            media: updatePostMediaFiles,
            tags,
            postId: updatePostData._id,
          })
        }
      />
    )
  );
}

export default UpdatePostPortal;
