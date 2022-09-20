import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserId } from '../../store/selectors/userSelectors';

function useForeignUser(basedOn, userId) {
  const { id: activeUserId } = useSelector(selectUserId);
  const { id: profileId } = useParams();

  const run = {
    basedOnId: activeUserId === userId,
    basedOnLocation: activeUserId === profileId,
  };

  return run[basedOn];
}

export default useForeignUser;
