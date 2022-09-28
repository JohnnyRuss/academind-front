import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createPost } from '../../store/reducers/createPostReducer';
import { updatePost, sharePost } from '../../store/reducers/portalReducer';
import { deletePost, reactOnPost, savePost } from '../../store/reducers/postsDataReducer';

function usePostQuery() {
  const dispatch = useDispatch();

  const [startDeletion, setStartDeletion] = useState(false);

  // includes update order
  const handlePostPublish = ({ operationType, type, description, media, tags, postId }) => {
    const credentials = {
      description,
      tags: JSON.stringify(tags.map((tag) => tag._id)),
    };

    /*
    when user tries to update post which one already has media files, we need to separate old and new media files in different properties. images variable will hold new media files which will be uploaded on db and media property will hold the existng media files, even if user deletes on the post all old media files, we need to send empty array on db and then db will compare each other old and new media properties and files which will not be matched will be deleted from db 
    */
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

  function sharePostHandler(postId, body) {
    dispatch(sharePost({ postId, body }));
  }

  function savePostHandler(postId) {
    dispatch(savePost(postId));
  }

  return {
    handlePostPublish,
    deletePostHandler,
    startDeletion,
    reactOnPostHandler,
    sharePostHandler,
    savePostHandler,
  };
}

export default usePostQuery;
