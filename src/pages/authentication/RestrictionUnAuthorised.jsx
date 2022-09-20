import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuthValidation } from '../../hooks';

import { StandSpinner } from '../../components/Interface';

const MediaPortal = lazy(() => import('../../components/Portal/MediaPortal'));
const UpdatePostPortal = lazy(() => import('../../components/Portal/UpdatePostPortal'));
const SharePostPortal = lazy(() => import('../../components/Portal/SharePostPortal'));

function RestrictionUnAuthorised() {
  useAuthValidation();

  const { mediaModalIsOpen, updatePostModalIsOpen, sharePostModalIsOpen } = useSelector(
    ({ portal }) => portal
  );
  
  return (
    <>
      <Suspense fallback={<StandSpinner />}>
        {mediaModalIsOpen && <MediaPortal />}
        {updatePostModalIsOpen && <UpdatePostPortal />}
        {sharePostModalIsOpen && <SharePostPortal />}
      </Suspense>
      <Outlet />;
    </>
  );
}

export default RestrictionUnAuthorised;
