import { useDispatch } from "react-redux";
import {
  showOnProfile,
  removeTag,
  addToProfile,
  hideFromProfile,
} from "../../store/reducers/postsDataReducer";

function useProfileReviewQuery() {
  const dispatch = useDispatch();

  function showOnProfileQuery(postId, value) {
    dispatch(showOnProfile({ postId, body: { show: value } }));
  }

  function removeTagQuery(postId) {
    dispatch(removeTag(postId));
  }

  function addToProfileQuery(postId) {
    dispatch(addToProfile(postId));
  }

  function hideFromProfileQuery(postId) {
    dispatch(hideFromProfile(postId));
  }

  return {
    showOnProfileQuery,
    removeTagQuery,
    addToProfileQuery,
    hideFromProfileQuery,
  };
}

export default useProfileReviewQuery;
