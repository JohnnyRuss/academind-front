import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createPost } from '../store/reducers/createPostReducer';
import { updatePost } from '../store/reducers/portalReducer';
import { deletePost, reactOnPost } from '../store/reducers/postsDataReducer';

function usePostQuery() {
  const dispatch = useDispatch();

  const [startDeletion, setStartDeletion] = useState(false);

  const handlePostPublish = ({ operationType, type, description, media }) => {
    const credentials = {
      description,
    };

    if (media[0]) {
      const oldMedia = media.filter((media) => typeof media === 'string');
      const newFiles = media.filter((media) => typeof media === 'object');

      if (oldMedia[0]) credentials.media = oldMedia;
      if (newFiles[0]) credentials.images = newFiles;
    }

    if (operationType === 'publish') {
      credentials.type = type;
      // dispatch(createPost(credentials));
      console.log('credentials for publish', credentials);
    } else if (operationType === 'update') {
      // dispatch(updatePost(credentials));
      console.log('credentials for update', credentials);
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
