/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAboutUserQuery } from "../../hooks";
import { selectAboutPageState } from "../../store/selectors/aboutPageSelectors";

import NewVersion from "../../components/AboutPage/NewVersion";
import NewVersionContainer from "../../components/AboutPage/NewVersionContainer";
import { Spinner } from "../../components/Layouts";
// import About from "../../components/AboutPage/NewVersion";

function AboutPage() {
  const { id } = useParams();

  const { getAboutUserQuery } = useAboutUserQuery();
  const { loading } = useSelector(selectAboutPageState);

  useEffect(() => {
    getAboutUserQuery(id);
  }, []);

  return (
    <NewVersionContainer>
      {loading && <Spinner />}
      {!loading && <NewVersion />}
    </NewVersionContainer>
  );
}

export default AboutPage;
