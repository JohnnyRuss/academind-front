/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "../../../hooks";
import {
  selectPosts,
  selectPostsLoadingState,
} from "../../../store/selectors/postSelectors";

import {
  Spinner,
  Error,
  EmptyContentMessage,
} from "../../../components/Layouts";
import ProfileReviewHiddenPosts from "../../../components/ProfileReview/ProfileReviewHiddenPosts";

function ReviewHiddenPosts() {
  const { posts } = useSelector(selectPosts);

  const { loading, error, message } = useSelector(selectPostsLoadingState);

  const { getHiddenPostsQuery, resetState } = useProfileReviewQuery();

  useEffect(() => {
    getHiddenPostsQuery();
    return () => resetState();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <ProfileReviewHiddenPosts />}
      {error && <Error msg={message} />}
      {!loading && !error && !posts[0] && (
        <EmptyContentMessage message="there are no hidden posts" />
      )}
    </>
  );
}

export default ReviewHiddenPosts;
