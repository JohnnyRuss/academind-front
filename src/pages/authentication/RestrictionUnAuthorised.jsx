import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuthValidation } from '../../hooks';

import { StandSpinner } from '../../components/Interface';
import Notifications from '../../components/Notifications/Notifications';

const MediaPortal = lazy(() => import('../../components/Portal/MediaPortal'));
const UpdatePostPortal = lazy(() => import('../../components/Portal/UpdatePostPortal'));
const UpdateBlogPostPortal = lazy(() => import('../../components/Portal/UpdateBlogPostPortal'));
const SharePostPortal = lazy(() => import('../../components/Portal/SharePostPortal'));

function RestrictionUnAuthorised() {
  useAuthValidation();

  const {
    mediaModalIsOpen,
    updatePostModalIsOpen,
    sharePostModalIsOpen,
    updateBlogPostModalIsOpen,
  } = useSelector(({ portal }) => portal);

  const { activeNotifications } = useSelector(({ activeUser }) => activeUser);

  return (
    <>
      <Suspense fallback={<StandSpinner />}>
        {mediaModalIsOpen && <MediaPortal />}
        {updatePostModalIsOpen && <UpdatePostPortal />}
        {updateBlogPostModalIsOpen && <UpdateBlogPostPortal />}
        {sharePostModalIsOpen && <SharePostPortal />}
      </Suspense>
      {activeNotifications && <Notifications />}
      <Outlet />
    </>
  );
}

export default RestrictionUnAuthorised;
