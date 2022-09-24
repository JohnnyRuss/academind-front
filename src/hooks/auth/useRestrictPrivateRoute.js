import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectUserId } from '../../store/selectors/userSelectors';

function useRestrictPrivateRoute() {
  const navigate = useNavigate();

  const { id: activeUserId } = useSelector(selectUserId);
  const { id: profileId } = useParams();

  useEffect(() => {
    if (activeUserId !== profileId) navigate(-1);
  }, [activeUserId, profileId, navigate]);
}

export default useRestrictPrivateRoute;
