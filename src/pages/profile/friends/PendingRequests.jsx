/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPendingRequestsPageState } from "../../../store/selectors/friendsSelector";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";
import { resetFriends } from "../../../store/reducers/friendsReducer";
import { useRestrictPrivateRoute, useFriendsQuery } from "../../../hooks";
import { PendingRequests } from "../../../components/FriendsPage";
import { Spinner } from "../../../components/Layouts";

function PendingRequest() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();

  const activeUserId = useSelector(selectActiveUserId);
  const {
    loadingState: { loading },
  } = useSelector(selectPendingRequestsPageState);

  const { getPendingRequestsQuery } = useFriendsQuery();

  useEffect(() => {
    getPendingRequestsQuery(activeUserId);
    return () => dispatch(resetFriends());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <PendingRequests />}
    </>
  );
}

export default PendingRequest;
