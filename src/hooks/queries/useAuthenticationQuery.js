import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  // NaN API Handlers
  resetLoadingStateError,
  resetRegistrationError,
  resetRegistrationpProccess,
  // API Handlers
  checkExistingRegister,
  sendRegisterPasswordConfirm,
  logOut,
  sendRegistrationRequest,
} from "../../store/reducers/activeUserReducer";

import { ValidateRegistrationInfo } from "../../lib";

export default function useAuthenticationQuery() {
  const dispatch = useDispatch();

  function checkExistingRegisterQuery({ requestId, tokenId }) {
    dispatch(checkExistingRegister({ requestId, tokenId }));
  }

  function sendRegisterPasswordConfirmQuery({ requestId, tokenId, body }) {
    dispatch(sendRegisterPasswordConfirm({ requestId, tokenId, body }));
  }

  function logOutQuery() {
    dispatch(logOut());
  }

  const [regError, setRegError] = useState({
    error: false,
    firstName: {
      hasError: false,
      message: "",
    },
    lastName: {
      hasError: false,
      message: "",
    },
    email: {
      hasError: false,
      message: "",
    },
    gender: {
      hasError: false,
      message: "",
    },
    from: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
    livingPlace: {
      country: {
        hasError: false,
        message: "",
      },
      city: {
        hasError: false,
        message: "",
      },
    },
    institution: {
      hasError: false,
      message: "",
    },
    position: {
      hasError: false,
      message: "",
    },
    description: {
      hasError: false,
      message: "",
    },
  });

  function sendRegistrationRequestQuery(params) {
    const error = new ValidateRegistrationInfo(params).init();

    if (error.error) return setRegError(error);

    dispatch(sendRegistrationRequest(params));
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
    regError,
    // API Handlers
    resetRegistrationErrorHandler,
    cleanUpRegistrationConfirm,
    logOutQuery,
    sendRegistrationRequestQuery,
  };
}
