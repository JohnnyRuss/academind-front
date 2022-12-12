/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useFriendsQuery } from "../../hooks";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { selectSentRequestsPageState } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/request.module.scss";
import { CancelRequestBTN, Spinner } from "../Layouts";
import RequestItemBody from "./components/RequestItemBody";

function SentRequests() {
  const {
    loadingState: { loading },
    sentRequests,
    searchKey,
  } = useSelector(selectSentRequestsPageState);
  const activeUserId = useSelector(selectActiveUserId);

  const { cancelFriendRequestQuery, getSentRequestsQuery } = useFriendsQuery();

  useEffect(() => {
    getSentRequestsQuery(activeUserId);
  }, []);

  return (
    <div className={styles.requestsList}>
      {loading && <Spinner />}
      {!loading &&
        sentRequests
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
              <CancelRequestBTN
                onClick={() => cancelFriendRequestQuery(adressat._id)}
              />
            </RequestItemBody>
          ))}
    </div>
  );
}

export default SentRequests;
