import { Outlet } from 'react-router-dom';
import UserCover from './components/UserCover';

function Profile() {
  return (
    <>
      <UserCover />
      <Outlet />
    </>
  );
}

export default Profile;
