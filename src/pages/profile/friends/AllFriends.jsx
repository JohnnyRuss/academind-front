/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { resetFriends } from "../../../store/reducers/friendsReducer";
import { useFriendsQuery } from "../../../hooks";
import { selectAllFriendsPageState } from "../../../store/selectors/friendsSelector";

import { AllFriends as Friends } from "../../../components/FriendsPage";
import { Spinner } from "../../../components/Layouts";

function AllFriends() {
  const dispatch = useDispatch();
  const { id: userId } = useParams();

  const { getAllFriendsQuery } = useFriendsQuery();
  const {
    loadingState: { loading },
  } = useSelector(selectAllFriendsPageState);

  useEffect(() => {
    getAllFriendsQuery(userId);

    return () => dispatch(resetFriends());
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <Friends />}
    </>
  );
}

export default AllFriends;
