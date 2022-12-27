/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuthenticationQuery } from "../../hooks";
import {
  selectActiveUserLoadingState,
  selectActiveUserRegistrationLoadingState,
  selectIsExistingRequestAndSuccessMessage,
  selectActiveUser,
} from "../../store/selectors/activeUserSelectors";

import styles from "./auth.module.scss";
import { BTN, Input, StandSpinner, Error } from "../Layouts";

function RegistrationConfirmPassword(props) {
  const { registrationId, tokenId } = useParams();
  const navigate = useNavigate();

  const {
    loading: registerLoading,
    error: registerError,
    message: registerMessage,
  } = useSelector(selectActiveUserRegistrationLoadingState);
  const { isExistingRegister, successfullRegistration } = useSelector(
    selectIsExistingRequestAndSuccessMessage
  );
  const { loading, error, message } = useSelector(selectActiveUserLoadingState);
  const { isAuthenticated } = useSelector(selectActiveUser);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const {
    // NaN API Handlers
    resetError,
    resetRegistrationErrorHandler,
    cleanUpRegistrationConfirm,
    // API Handlers
    checkExistingRegisterQuery,
    sendRegisterPasswordConfirmQuery,
    logOutQuery,
  } = useAuthenticationQuery();

  function onSubmitPassword(e) {
    e.preventDefault();

    if (!isExistingRegister) return;

    if (!password)
      return setPasswordError({
        error: true,
        message: "please enter the password",
      });

    sendRegisterPasswordConfirmQuery({
      requestId: registrationId,
      tokenId,
      body: { password },
    });

    setPassword("");
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    if (passwordError.error)
      setPasswordError({
        error: false,
        message: "",
      });
  }

  useEffect(() => {
    if (isAuthenticated) logOutQuery();
    checkExistingRegisterQuery({ requestId: registrationId, tokenId });
  }, []);

  useEffect(() => {
    if (registerLoading || !successfullRegistration || registerError) return;
    setSuccessModalIsOpen(true);

    return () => cleanUpRegistrationConfirm();
  }, [registerLoading, successfullRegistration, registerError]);

  return (
    <>
      {(loading || registerLoading) && <StandSpinner />}
      {!loading && !error && (
        <form
          className={styles.registrationConfirmPasswordContainer}
          onSubmit={onSubmitPassword}
        >
          <Input
            value={password}
            onChange={handlePassword}
            placeholder="enter your password"
            type="password"
            error={passwordError.error}
            message={passwordError.message}
          />
          <BTN disabled={!isExistingRegister} type="submit">
            confirm password
          </BTN>
        </form>
      )}
      {(error || registerError) && (
        <Error
          asModal={true}
          msg={error ? message : registerError ? registerMessage : ""}
          onClose={
            error
              ? resetError
              : registerError
              ? resetRegistrationErrorHandler
              : () => {}
          }
        />
      )}
      {successModalIsOpen && (
        <div className={styles.successModalBackDrop}>
          <div className={styles.successModalBox}>
            <p>You are registered successfully !</p>
            <BTN
              onClick={() =>
                navigate("/authentication/login", { replace: true })
              }
            >
              go for authorization
            </BTN>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationConfirmPassword;
