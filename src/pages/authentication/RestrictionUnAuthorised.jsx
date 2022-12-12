import { Suspense, lazy, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoContext } from "../../store/Io";

import { selectActiveUserShortInfo } from "../../store/selectors/activeUserSelectors";
import { useAuthValidation } from "../../hooks";

import { StandSpinner } from "../../components/Layouts";
import Notifications from "../../components/Notifications/Notifications";

const MediaPortal = lazy(() => import("../../components/Portal/MediaPortal"));
const UpdatePostPortal = lazy(() =>
  import("../../components/Portal/UpdatePostPortal")
);
const UpdateBlogPostPortal = lazy(() =>
  import("../../components/Portal/UpdateBlogPostPortal")
);
const SharePostPortal = lazy(() =>
  import("../../components/Portal/SharePostPortal")
);

function RestrictionUnAuthorised() {
  useAuthValidation();

  const { connection } = useContext(IoContext);

  const {
    mediaModalIsOpen,
    updatePostModalIsOpen,
    sharePostModalIsOpen,
    updateBlogPostModalIsOpen,
  } = useSelector(({ portal }) => portal);

  const { activeNotifications } = useSelector(({ activeUser }) => activeUser);

  const activeUser = useSelector(selectActiveUserShortInfo);

  useEffect(() => {
    connection(activeUser);
  }, []);

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
