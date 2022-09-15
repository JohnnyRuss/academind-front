import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { deActivateTarget } from '../../store/reducers/aboutReducer';

import styles from './components/about.module.scss';
import { UserInfo } from './components/UserInfo';
import { UpdateForm } from './components/UpdateForms';

/**
 * ties together AboutPage left and wright/info and update-form components
 * @param {Object} data object which one contains the user info
 * @returns
 */
function About({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(deActivateTarget());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userInfo = data;
  return (
    <>
      <div className={styles.about}>
        <UserInfo userInfo={data} />
        <UpdateForm />
      </div>
      <div className={styles.detailedInfo}>
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
      </div>
    </>
  );
}

export default About;
