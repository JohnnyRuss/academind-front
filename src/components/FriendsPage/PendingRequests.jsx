/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useFriendsQuery, useBadgeQuery, useScroll } from "../../hooks";
import { selectPendingRequestsPageState } from "../../store/selectors/friendsSelector";
import { selectRequestCount } from "../../store/selectors/badgeSelectors";

import styles from "./components/styles/request.module.scss";
import { DeleteRequestBTN, ConfirmRequestBtn } from "../Layouts";
import RequestItemBody from "./components/RequestItemBody";

function PendingRequests() {
  const { id: userId } = useParams();

  const { pendingRequests, searchKey } = useSelector(
    selectPendingRequestsPageState
  );
  const unSeenRequestsCount = useSelector(selectRequestCount);

  const { confirmFriendRequestQuery, deleteFriendRequestQuery } =
    useFriendsQuery();

  const { resetUnseenRequestsCountQuery } = useBadgeQuery();

  useEffect(() => {
    if (unSeenRequestsCount > 0) resetUnseenRequestsCountQuery(userId);
  }, []);

  useScroll({ target: "elem", scrollTo: "nested-pending--requests__page" });

  return (
    <div className={styles.requestsList} id="nested-pending--requests__page">
      {pendingRequests
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
