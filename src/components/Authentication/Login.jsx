import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveUserLoadingState } from '../../store/selectors/activeUserSelectors';
import { login, resetLoadingState } from '../../store/reducers/activeUserReducer';

import styles from './auth.module.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(selectActiveUserLoadingState);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const loginInput = {};
      for (const [key, value] of formData) {
        loginInput[key] = value;
      }

      dispatch(login(loginInput));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (loading === false) {
      // createAxiosQuery();
      navigate('/feed');
    }

    return () => dispatch(resetLoadingState());
  }, [loading]);

  return (
    <form onSubmit={submitHandler} className={styles.authForm}>
      <input type='text' name='email' defaultValue='russ@io.com' />
      <input type='text' name='password' defaultValue='pass1234' />
      <button type='submit'>login</button>
    </form>
  );
}

export default Login;
