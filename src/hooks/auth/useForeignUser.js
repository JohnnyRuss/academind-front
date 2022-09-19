import { useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';

function useForeignUser(userId) {
  const { id: activeUserId } = useSelector(selectUserId);
  return activeUserId === userId;
}

export default useForeignUser;
