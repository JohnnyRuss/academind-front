import { useRestrictPrivateRoute } from '../../../hooks';
import { PendingRequests } from '../../../components/FriendsPage';

function PendingRequest() {
  useRestrictPrivateRoute();

  return <PendingRequests />;
}

export default PendingRequest;
