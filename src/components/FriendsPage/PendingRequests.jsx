/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useFriendsQuery, useBadgeQuery } from "../../hooks";
import { selectPendingRequestsPageState } from "../../store/selectors/friendsSelector";
import { selectRequestCount } from "../../store/selectors/badgeSelectors";

import styles from "./components/styles/request.module.scss";
import { DeleteRequestBTN, ConfirmRequestBtn, Spinner } from "../Layouts";
import RequestItemBody from "./components/RequestItemBody";

function PendingRequests() {
  const { id: userId } = useParams();

  const [isMounting, setIsMounting] = useState(true);

  const {
    loadingState: { loading },
    pendingRequests,
    searchKey,
  } = useSelector(selectPendingRequestsPageState);
  const unSeenRequestsCount = useSelector(selectRequestCount);

  const {
    confirmFriendRequestQuery,
    deleteFriendRequestQuery,
    getPendingRequestsQuery,
  } = useFriendsQuery();

  const { resetUnseenRequestsCountQuery } = useBadgeQuery();

  useEffect(() => {
    setIsMounting(false);
    getPendingRequestsQuery(userId);
  }, []);

  useEffect(() => {
    if (!loading && !isMounting && unSeenRequestsCount > 0)
      resetUnseenRequestsCountQuery(userId);
  }, [loading]);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        pendingRequests
          .filter((adressat) => {
            if (!searchKey) return adressat;
            else return adressat.userName.includes(searchKey);
          })
          .map((adressat) => (
            <RequestItemBody
              key={adressat._id}
              img={adressat.profileImg}
              userName={adressat.userName}
              userId={adressat._id}
              muntuals={adressat.muntuals}
            >
              <DeleteRequestBTN
                onClick={() => deleteFriendRequestQuery(adressat._id)}
              />
              <ConfirmRequestBtn
                onClick={() => confirmFriendRequestQuery(adressat._id)}
              />
            </RequestItemBody>
          ))}
    </div>
  );
}

export default PendingRequests;
