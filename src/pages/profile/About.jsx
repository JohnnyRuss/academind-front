import { userInfo } from '../../utils';

import About from '../../components/AboutPage/About';

function about() {
  return <About data={userInfo} />;
}

export default about;
