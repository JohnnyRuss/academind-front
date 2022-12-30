/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAboutUserQuery } from "../../hooks";
import { selectAboutPageState } from "../../store/selectors/aboutPageSelectors";

import About from "../../components/AboutPage/About";
import AboutContainer from "../../components/AboutPage/AboutContainer";
import { Spinner, Error } from "../../components/Layouts";

function AboutPage() {
  const { id } = useParams();

  const { getAboutUserQuery } = useAboutUserQuery();
  const { loading, error, message } = useSelector(selectAboutPageState);

  useEffect(() => {
    getAboutUserQuery(id);
  }, []);

  return (
    <AboutContainer>
      {loading && <Spinner />}
      {!loading && !error && <About />}
      {error && <Error msg={message} />}
    </AboutContainer>
  );
}

export default AboutPage;
