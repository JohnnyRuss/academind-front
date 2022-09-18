import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createPost } from '../../store/reducers/createPostReducer';
import { updatePost } from '../../store/reducers/portalReducer';
import { deletePost, reactOnPost } from '../../store/reducers/postsDataReducer';

function usePostQuery() {
  const dispatch = useDispatch();

  const [startDeletion, setStartDeletion] = useState(false);

  const handlePostPublish = ({ operationType, type, description, media, postId }) => {
    const credentials = {
      description,
    };

    const oldMedia = media.filter((media) => typeof media === 'string');
    const newFiles = media.filter((media) => typeof media === 'object');

    credentials.media = JSON.stringify(oldMedia);

    if (newFiles[0]) credentials.images = newFiles;

    if (operationType === 'publish') {
      credentials.type = type;
      dispatch(createPost(credentials));
    } else if (operationType === 'update') {
      dispatch(updatePost({ params: { postId }, body: credentials }));
    }
  };

  function deletePostHandler(postId) {
    setStartDeletion(true);
    dispatch(deletePost(postId));
  }

  function reactOnPostHandler({ postReaction, postId }) {
    const reaction = JSON.parse(postReaction);
    dispatch(reactOnPost({ postId, body: { reaction } }));
  }

  return { handlePostPublish, deletePostHandler, reactOnPostHandler, startDeletion };
}

export default usePostQuery;
