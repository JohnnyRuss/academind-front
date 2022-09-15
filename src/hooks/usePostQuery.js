import { useDispatch } from 'react-redux';

import { reactOnPost } from '../store/reducers/postsDataReducer';

function usePostQuery() {
  const dispatch = useDispatch();

  async function deletePostHandler({ postId }) {
    console.log('delete post');
    try {
      // deleteHandler({ variables: { postId } });
    } catch (error) {
      console.log({ error: error.message, location: 'usePostQuery - deletePostHandler' });
    }
  }

  function reactOnPostHandler({ postReaction, postId }) {
    try {
      const reaction = JSON.parse(postReaction);
      dispatch(reactOnPost({ postId, body: { reaction } }));
    } catch (error) {
      console.log({
        error: error.message,
        location: 'usePostQuery - reactOnPostHandler',
        stack: error.stack,
      });
    }
  }

  return { deletePostHandler, reactOnPostHandler };
}

export default usePostQuery;
