import { useDispatch } from 'react-redux';
import { showOnProfile, removeTag } from '../../store/reducers/postsDataReducer';

function useProfileReviewQuery() {
  const dispatch = useDispatch();

  function showOnProfileHandler(postId, value) {
    dispatch(showOnProfile({ postId, body: { show: value } }));
  }

  function removeTagHandler(postId) {
    dispatch(removeTag(postId));
  }

  return { showOnProfileHandler, removeTagHandler };
}

export default useProfileReviewQuery;
