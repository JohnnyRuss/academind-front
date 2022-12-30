/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { selectUserLoadingState } from "../../store/selectors/userSelectors";
import { useUserProfileQuery } from "../../hooks";

import UserCover from "../../components/UserCover/UserCover";
import { Error, StandSpinner } from "../../components/Layouts";

function UserPage() {
  const { id: profileId } = useParams();

  const { loading, error, message } = useSelector(selectUserLoadingState);

  const { getUserProfileQuery, handleResetError } = useUserProfileQuery();

  useEffect(() => {
    getUserProfileQuery(profileId);
  }, [profileId]);

  return (
    <>
      {loading && <StandSpinner />}
      {!loading && !error && (
        <>
          <UserCover />
          <Outlet />
        </>
      )}
      {error && (
        <Error asModal={true} msg={message} onClose={handleResetError} />
      )}
    </>
  );
}

export default UserPage;