/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectPosts } from "../../store/selectors/postSelectors";
import { selectUserNestedLoadingState } from "../../store/selectors/userSelectors";

import { useRestrictPrivateRoute, useBookmarksQuery } from "../../hooks";

import Bookmarks from "../../components/BookmarkPage/Bookmarks";
import BookmarksContainer from "../../components/BookmarkPage/BookmarksContainer";
import { Spinner } from "../../components/Layouts";

function BookmarksPage() {
  useRestrictPrivateRoute();

  const { posts, hasMore } = useSelector(selectPosts);

  const { loading } = useSelector(selectUserNestedLoadingState);
  const { getBookmarksQuery, resetState } = useBookmarksQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getBookmarksQuery({ page: page + 1, hasMore: true });
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getBookmarksQuery({ manualLoading: true });
    return () => resetState();
  }, []);

  return (
    <BookmarksContainer>
      {loading && <Spinner />}
      {!loading && (
        <Bookmarks
          loading={loading}
          hasMore={hasMore}
          handleNext={handleNext}
          posts={posts}
        />
      )}
    </BookmarksContainer>
  );
}

export default BookmarksPage;
