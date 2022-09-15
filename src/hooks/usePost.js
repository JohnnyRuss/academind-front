import { useDispatch } from 'react-redux';

import {
  setMediaModalOpen,
  setUpdatePostModalOpen,
  setSharePostModalOpen,
} from '../store/reducers/portalReducer';

function usePost() {
  const dispatch = useDispatch();

  /**
   * passed on mediaFiles as onClick event and activates postMedia Modal
   * @param {Number} i returned from media element itself and describes clicked media index
   * @returns
   */
  const activatePostMediaHandler = (i, media) => dispatch(setMediaModalOpen({ index: i, media }));

  /**
   * sends post information to redux-state, and then from redux this information will be taken from UpdatePostPortal and autofills the corresponding fields
   */
  const activateUpdatePostModal = (data) => dispatch(setUpdatePostModalOpen(data));

  /**
   * sends post information to redux-state, and then from redux this information will be taken from SharePostPortal and autofills the corresponding fields
   */
  const activateSharePostModal = (data) => dispatch(setSharePostModalOpen(data));

  return { activatePostMediaHandler, activateUpdatePostModal, activateSharePostModal };
}

export default usePost;
