/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetFriends } from "../../../store/reducers/friendsReducer";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";
import { selectSentRequestsPageState } from "../../../store/selectors/friendsSelector";
import { useRestrictPrivateRoute, useFriendsQuery } from "../../../hooks";

import { SentRequests as Requests } from "../../../components/FriendsPage";
import { Spinner, Error } from "../../../components/Layouts";

function SentRequests() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);
  const {
    loadingState: { loading, error, message },
  } = useSelector(selectSentRequestsPageState);
  const { getSentRequestsQuery } = useFriendsQuery();

  useEffect(() => {
    getSentRequestsQuery(activeUserId);
    return () => dispatch(resetFriends());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <Requests />}
      {error && <Error msg={message} />}
    </>
  );
}

export default SentRequests;
