import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

function useRestrictPrivateRoute() {
  const navigate = useNavigate();

  const activeUserId = useSelector(selectActiveUserId);
  const { id: profileId } = useParams();

  useEffect(() => {
    if (activeUserId !== profileId) navigate(-1, { replace: true });
  }, [activeUserId, profileId, navigate]);
}

export default useRestrictPrivateRoute;
