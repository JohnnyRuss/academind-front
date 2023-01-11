import { useDispatch, useSelector } from "react-redux";

import { FEED_POSTS_COUNT_PER_REQ } from "../../lib/config";
import { resetUserError } from "../../store/reducers/userReducer";
import {
  resetPosts,
  getFeedPosts,
} from "../../store/reducers/postsDataReducer";
import { resetComments } from "../../store/reducers/commentsDataReducer";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

export default function useFeedQuery() {
  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  function getFeedPostsQuery({ page = 1, hasMore = false }) {
    dispatch(
      getFeedPosts({
        limit: FEED_POSTS_COUNT_PER_REQ,
        id: activeUserId,
        hasMore,
        page,
      })
    );
  }

  function resetState() {
    dispatch(resetPosts());
    dispatch(resetComments());
  }

  function handleResetFeedError() {
    dispatch(resetUserError());
  }

  return { getFeedPostsQuery, resetState, handleResetFeedError };
}
