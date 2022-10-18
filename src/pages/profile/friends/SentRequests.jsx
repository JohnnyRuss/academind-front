import { useRestrictPrivateRoute } from '../../../hooks';
import { SentRequests as Requests } from '../../../components/FriendsPage';

function SentRequests() {
  useRestrictPrivateRoute();

  return <Requests />;
}

export default SentRequests;
