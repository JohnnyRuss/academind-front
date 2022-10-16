import { useDispatch } from 'react-redux';
import {
  showOnProfile,
  removeTag,
  addToProfile,
  hideFromProfile,
} from '../../store/reducers/postsDataReducer';

function useProfileReviewQuery() {
  const dispatch = useDispatch();

  function showOnProfileHandler(postId, value) {
    dispatch(showOnProfile({ postId, body: { show: value } }));
  }

  function removeTagHandler(postId) {
    dispatch(removeTag(postId));
  }

  function addToProfileHandler(postId) {
    dispatch(addToProfile(postId));
  }

  function hideFromProfileHandler(postId) {
    dispatch(hideFromProfile(postId));
  }

  return { showOnProfileHandler, removeTagHandler, addToProfileHandler, hideFromProfileHandler };
}

export default useProfileReviewQuery;
