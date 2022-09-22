import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserId } from '../../store/selectors/userSelectors';

/**
 * @param {*} basedOn basedOnId | basedOnLocation
 * @param {*} userId required only if basedOn is defined as 'basedOnId'
 * @returns
 */
function useForeignUser(basedOn, userId) {
  const { id: activeUserId } = useSelector(selectUserId);
  const { id: profileId } = useParams();

  const run = {
    basedOnId: activeUserId === userId,
    basedOnLocation: activeUserId === profileId,
  };

  return { isActiveUser: run[basedOn], profileId };
}

export default useForeignUser;
