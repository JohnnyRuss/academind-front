import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './auth.module.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    // dispatch(setActiveUser(loginUser));
    // navigate('/feed');

    try {
      const formData = new FormData(e.currentTarget);
      const loginInput = {};
      for (const [key, value] of formData) {
        loginInput[key] = value;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={submitHandler} className={styles.authForm}>
      <input type='text' name='email' defaultValue='russ@io.com' />
      <input type='text' name='password' defaultValue='pass1234' />
      <button type='submit'>login</button>
    </form>
  );
}

export default Login;
