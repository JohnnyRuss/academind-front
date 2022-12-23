/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAboutUserQuery } from "../../hooks";
import { selectAboutPageState } from "../../store/selectors/aboutPageSelectors";

import NewVersion from "../../components/AboutPage/NewVersion";
import NewVersionContainer from "../../components/AboutPage/NewVersionContainer";
import { Spinner, Error } from "../../components/Layouts";

function AboutPage() {
  const { id } = useParams();

  const { getAboutUserQuery } = useAboutUserQuery();
  const { loading, error, message } = useSelector(selectAboutPageState);

  useEffect(() => {
    getAboutUserQuery(id);
  }, []);

  return (
    <NewVersionContainer>
      {loading && <Spinner />}
      {!loading && !error && <NewVersion />}
      {error && <Error msg={message} />}
    </NewVersionContainer>
  );
}

export default AboutPage;
