/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectActiveUserLoadingState } from "../../store/selectors/activeUserSelectors";
import {
  login,
  resetLoadingState,
} from "../../store/reducers/activeUserReducer";

import styles from "./auth.module.scss";

function Login() {
  const dispatch = useDispatch();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

      setIsAuthenticating(true);
    } catch (error) {
      // console.error(error);
    }
  }

  useEffect(() => {
    return () => {
      setIsAuthenticating(false);
      dispatch(resetLoadingState("loadingState"));
    };
  }, [loading, isAuthenticating]);

  return (
    <form onSubmit={submitHandler} className={styles.authForm}>
      <input type="text" name="email" defaultValue="russ@io.com" />
      <input type="text" name="password" defaultValue="pass1234" />
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
