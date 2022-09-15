import UserCover from '../UserCover/components/UserCover';

function ProfileLayout({ children }) {
  return (
    <>
      <UserCover />
      {children}
    </>
  );
}

export default ProfileLayout;
