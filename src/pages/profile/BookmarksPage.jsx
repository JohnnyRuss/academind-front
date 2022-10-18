/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';
import { selectPosts } from '../../store/selectors/postSelectors';
import { getBookmarks, startNestedLoading } from '../../store/reducers/userReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';

import { useRestrictPrivateRoute } from '../../hooks';

import { BOOKMARKS_POSTS_COUNT_PER_REQ } from '../../lib/config';

import Bookmarks from '../../components/BookmarkPage/Bookmarks';

function BookmarksPage() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  const { id } = useSelector(selectUserId);
  const { posts, hasMore } = useSelector(selectPosts);

  const { loading } = useSelector(({ user }) => user.nestedLoadingState);

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(
      getBookmarks({ id, page: page + 1, limit: BOOKMARKS_POSTS_COUNT_PER_REQ, hasMore: true })
    );
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    dispatch(startNestedLoading());
    dispatch(getBookmarks({ id, page: 1, limit: BOOKMARKS_POSTS_COUNT_PER_REQ, hasMore: false }));
    return () => dispatch(resetPosts());
  }, []);

  return <Bookmarks loading={loading} hasMore={hasMore} handleNext={handleNext} posts={posts} />;
}

export default BookmarksPage;
