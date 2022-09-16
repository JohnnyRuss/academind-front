import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resetUpdatePostModal } from '../../store/reducers/portalReducer';

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

  const [description, setDescription] = useState(updatePostData.description);

  const handleDescription = (e) => setDescription(e.target.value);

  const deactivateHandler = () => dispatch(resetUpdatePostModal());

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    if (!updatePostModalIsOpen) restrictScroll(false);
  }, [updatePostModalIsOpen, restrictScroll]);

  const { handlePostPublish } = usePostQuery();

  return (
    updatePostModalIsOpen && (
      <CreatePostModal
        loading={loading}
        isOpen={updatePostModalIsOpen}
        setIsOpen={deactivateHandler}
        defaultDescription={description}
        handleDescription={handleDescription}
        handlePost={() =>
          handlePostPublish({
            description,
            media: updatePostMediaFiles,
            type: 'post',
            operationType: 'update',
          })
        }
      />
    )
  );
}

export default UpdatePostPortal;
