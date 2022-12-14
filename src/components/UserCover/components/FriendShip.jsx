import { useNavigate } from "react-router-dom";
import { useFriendsQuery } from "../../../hooks";
import { axiosQuery } from "../../../store/axiosConfig";

import styles from "./styles/friendShip.module.scss";
import {
  DeleteRequestBTN,
  CancelRequestBTN,
  ConfirmRequestBtn,
  SendRequestBTN,
  IsFriendBTN,
  SendMessageBTN,
} from "../../Layouts";

function FriendShip({ friendShip, profileId, setFriendShip }) {
  const navigate = useNavigate();

  const {
    sendFriendRequestQuery,
    cancelFriendRequestQuery,
    deleteFriendRequestQuery,
    confirmFriendRequestQuery,
    deleteFriendQuery,
  } = useFriendsQuery();

  async function handleConversation() {
    try {
      const { data } = await axiosQuery.post(`/conversation/${profileId}`);
      navigate(`/messanger/${data.conversationId}`, {
        state: { isNew: data?.isNew },
      });
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div className={styles.friendShipBTNBox}>
      {friendShip?.isFriend && (
        <IsFriendBTN
          deleteHanlder={() => {
            deleteFriendQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isFriend: false,
              isForeign: true,
            }));
          }}
        />
      )}
      {friendShip?.isForeign && (
        <SendRequestBTN
          onClick={() => {
            sendFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isSentRequest: true,
              isForeign: false,
            }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <ConfirmRequestBtn
          onClick={() => {
            confirmFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isPendingRequest: false,
              isFriend: true,
            }));
          }}
        />
      )}
      {friendShip?.isPendingRequest && (
        <DeleteRequestBTN
          onClick={() => {
            deleteFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isPendingRequest: false,
              isForeign: true,
            }));
          }}
        />
      )}
      {friendShip?.isSentRequest && (
        <CancelRequestBTN
          onClick={() => {
            cancelFriendRequestQuery(profileId);
            setFriendShip((prev) => ({
              ...prev,
              isSentRequest: false,
              isForeign: true,
            }));
          }}
        />
      )}
      <SendMessageBTN onClick={handleConversation} />
    </div>
  );
}

export default FriendShip;
