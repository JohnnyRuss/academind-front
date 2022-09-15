import UserCover from '../UserCover/UserCover';
import { Container, FriendsPageNavigation } from '../FriendsPage';

function FriendsLayout({ children }) {
  return (
    <>
      <UserCover />
      <Container>
        <FriendsPageNavigation />
        {children}
      </Container>
    </>
  );
}

export default FriendsLayout;
