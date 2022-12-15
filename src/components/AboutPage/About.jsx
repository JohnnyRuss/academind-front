/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deActivateTarget, resetData } from "../../store/reducers/aboutReducer";
import { selectAboutUserData } from "../../store/selectors/aboutPageSelectors";
import { useAboutUserQuery } from "../../hooks";

import styles from "./components/about.module.scss";
import { UserInfo } from "./components/UserInfo";
import { UpdateForm } from "./components/UpdateForms";

/**
 * ties together AboutPage left and wright/info and update-form components
 * @param {Object} data object which one contains the user info
 */
function About() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector(selectAboutUserData);
  const { getAboutUserQuery } = useAboutUserQuery();

  useEffect(() => {
    getAboutUserQuery(id);
    return () => {
      dispatch(deActivateTarget());
      dispatch(resetData());
    };
  }, []);

  return (
    <>
      <div className={styles.about}>
        <UserInfo userInfo={data} />
        <UpdateForm />
      </div>
      {/* <div className={styles.detailedInfo}>
        <h1>workplaces</h1>
        <span>
          <span>Current workplace </span>
          <strong>{userInfo.currentWorkPlace.company} </strong>
          <span>as </span>
          <strong>{userInfo.currentWorkPlace.position} </strong>
          <span>from </span>
          <strong>{userInfo.currentWorkPlace.from} </strong>
          <span>to </span>
          <strong>{userInfo.currentWorkPlace.to}</strong>
          <p>{userInfo.currentWorkPlace.description}</p>
        </span>
        <span>
          <span>Current workplace </span>
          <strong>{userInfo.currentWorkPlace.company} </strong>
          <span>as </span>
          <strong>{userInfo.currentWorkPlace.position} </strong>
          <span>from </span>
          <strong>{userInfo.currentWorkPlace.from} </strong>
          <span>to </span>
          <strong>{userInfo.currentWorkPlace.to}</strong>
          <p>{userInfo.currentWorkPlace.description}</p>
        </span>
        <span>
          <span>Current workplace </span>
          <strong>{userInfo.currentWorkPlace.company} </strong>
          <span>as </span>
          <strong>{userInfo.currentWorkPlace.position} </strong>
          <span>from </span>
          <strong>{userInfo.currentWorkPlace.from} </strong>
          <span>to </span>
          <strong>{userInfo.currentWorkPlace.to}</strong>
          <p>{userInfo.currentWorkPlace.description}</p>
        </span>
        <span>
          <span>Current workplace </span>
          <strong>{userInfo.currentWorkPlace.company} </strong>
          <span>as </span>
          <strong>{userInfo.currentWorkPlace.position} </strong>
          <span>from </span>
          <strong>{userInfo.currentWorkPlace.from} </strong>
          <span>to </span>
          <strong>{userInfo.currentWorkPlace.to}</strong>
          <p>{userInfo.currentWorkPlace.description}</p>
        </span>
      </div> */}
    </>
  );
}

export default About;
