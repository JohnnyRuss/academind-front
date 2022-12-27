import { useDispatch } from "react-redux";
import {
  // NaN API Handlers
  resetLoadingStateError,
  resetRegistrationError,
  resetRegistrationpProccess,
  // API Handlers
  checkExistingRegister,
  sendRegisterPasswordConfirm,
  logOut,
} from "../../store/reducers/activeUserReducer";

export default function useAuthenticationQuery() {
  const dispatch = useDispatch();

  function checkExistingRegisterQuery({ requestId, tokenId }) {
    dispatch(checkExistingRegister({ requestId, tokenId }));
  }

  function sendRegisterPasswordConfirmQuery({ requestId, tokenId, body }) {
    dispatch(sendRegisterPasswordConfirm({ requestId, tokenId, body }));
  }

  function logOutQuery() {
    console.log("runs logout");
    dispatch(logOut());
  }

  // NaN API Tasks
  function resetError() {
    dispatch(resetLoadingStateError());
  }

  function resetRegistrationErrorHandler() {
    dispatch(resetRegistrationError());
  }

  function cleanUpRegistrationConfirm() {
    dispatch(resetRegistrationpProccess());
  }

  return {
    // NaN API Handlers
    checkExistingRegisterQuery,
    sendRegisterPasswordConfirmQuery,
    resetError,
    // API Handlers
    resetRegistrationErrorHandler,
    cleanUpRegistrationConfirm,
    logOutQuery,
  };
}
