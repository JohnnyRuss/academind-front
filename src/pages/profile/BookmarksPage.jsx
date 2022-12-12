/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getBookmarks,
  startNestedLoading,
} from "../../store/reducers/userReducer";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { selectPosts } from "../../store/selectors/postSelectors";
import { selectUserNestedLoadingState } from "../../store/selectors/userSelectors";
import { resetPosts } from "../../store/reducers/postsDataReducer";
import { resetComments } from "../../store/reducers/commentsDataReducer";

import { useRestrictPrivateRoute } from "../../hooks";

import { BOOKMARKS_POSTS_COUNT_PER_REQ } from "../../lib/config";

import Bookmarks from "../../components/BookmarkPage/Bookmarks";

function BookmarksPage() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  const activeUserId = useSelector(selectActiveUserId);
  const { posts, hasMore } = useSelector(selectPosts);

  const { loading } = useSelector(selectUserNestedLoadingState);

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(
      getBookmarks({
        id: activeUserId,
        page: page + 1,
        limit: BOOKMARKS_POSTS_COUNT_PER_REQ,
        hasMore: true,
      })
    );
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    dispatch(startNestedLoading());
    dispatch(
      getBookmarks({
        id: activeUserId,
        page: 1,
        limit: BOOKMARKS_POSTS_COUNT_PER_REQ,
        hasMore: false,
      })
    );

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
  }, []);

  return (
    <Bookmarks
      loading={loading}
      hasMore={hasMore}
      handleNext={handleNext}
      posts={posts}
    />
  );
}

export default BookmarksPage;
