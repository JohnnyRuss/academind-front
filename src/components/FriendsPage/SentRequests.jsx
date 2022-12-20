/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

import { useFriendsQuery, useScroll } from "../../hooks";
import { selectSentRequestsPageState } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/request.module.scss";
import { CancelRequestBTN } from "../Layouts";
import RequestItemBody from "./components/RequestItemBody";

function SentRequests() {
  const { sentRequests, searchKey } = useSelector(selectSentRequestsPageState);

  const { cancelFriendRequestQuery } = useFriendsQuery();

  useScroll({ target: "elem", scrollTo: "nested-sent--requests__page" });

  return (
    <div className={styles.requestsList} id="nested-sent--requests__page">
      {sentRequests
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
