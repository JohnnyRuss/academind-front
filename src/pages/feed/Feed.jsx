import { Container, Content, SideBarRight } from '../../components/Feed';
import { SideBar as SideBarLeft } from '../../components/Layouts';

function index() {
  return (
    <Container>
      <SideBarLeft />
      <Content />
      <SideBarRight />
    </Container>
  );
}

export default index;
