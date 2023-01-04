import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

import { ValidateUserInfo } from "../../lib";

import {
  addUserInfo,
  updateUserNestedInfo,
  deleteUserInfo,
  deleteNestedUserInfo,
  getUserInfo,
  updatePassword,
  updateEmail,
} from "../../store/reducers/settingsReducer";

export default function useSettingsQuery() {
  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  // UserInfo Validator Errors
  const [birthDateError, setBirthDateError] = useState({
    error: false,
    message: "",
  });

  const [livingPlaceError, setLivingPlaceError] = useState({
    error: false,
    city: {
      hasError: false,
      message: "",
    },
    country: {
      hasError: false,
      message: "",
    },
  });

  const [workplaceError, setWorkplaceError] = useState({
    error: false,
    company: {
      hasError: false,
      message: "",
    },

    position: {
      hasError: false,
      message: "",
    },
  });

  const [educationError, setEducationError] = useState({
    error: false,
    collage: {
      hasError: false,
      message: "",
    },

    faculty: {
      hasError: false,
      message: "",
    },

    degree: {
      hasError: false,
      message: "",
    },
  });

  // main queries which are called in callback by other functions to CRUD UserInfo
  function addUserInfoQuery({ field, data }) {
    const body = { [field]: data };
    dispatch(addUserInfo({ body, userId: activeUserId, field }));
  }

  function updateNestedUserInfoQuery({ field, docId, data }) {
    dispatch(
      updateUserNestedInfo({ userId: activeUserId, field, docId, data })
    );
  }

  function deleteUserInfoQuery({ field }) {
    dispatch(deleteUserInfo({ userId: activeUserId, field }));
  }

  function deleteUserNestedInfoQuery({ field, docId }) {
    dispatch(deleteNestedUserInfo({ userId: activeUserId, field, docId }));
  }

  /////////////////////////////////////////////////
  // Get And Update UserInfo
  function getUserInfoQuery(userId) {
    dispatch(getUserInfo(userId));
  }

  function addBirthDateQuery({ data }) {
    const { birthDateError } = new ValidateUserInfo(data).validateBirthdate();

    if (birthDateError.error) return setBirthDateError(birthDateError);

    addUserInfoQuery({ field: "birthDate", data });
  }

  function addBirthPlaceQuery({ data }) {
    const { livingPlaceError } = new ValidateUserInfo(
      data
    ).validateLivingplace();

    if (livingPlaceError.error) return setLivingPlaceError(livingPlaceError);

    addUserInfoQuery({
      field: "from",
      data,
    });
  }

  function addLivingPlaceQuery({ data }) {
    const { livingPlaceError } = new ValidateUserInfo(
      data
    ).validateLivingplace();

    if (livingPlaceError.error) return setLivingPlaceError(livingPlaceError);

    addUserInfoQuery({
      field: "currentLivingPlace",
      data,
    });
  }

  function addEducationQuery({ operation, data, docId }) {
    const { educationError } = new ValidateUserInfo(data).validateEducation();

    if (educationError.error) return setEducationError(educationError);

    if (operation === "add") addUserInfoQuery({ field: "education", data });
    else if (operation === "update")
      updateNestedUserInfoQuery({ field: "education", data, docId });
  }

  function addWorkplaceQuery({ operation, data, docId }) {
    const { workPlaceError: workPlcError } = new ValidateUserInfo(
      data
    ).validateWorkplace();

    if (workPlcError.error) return setWorkplaceError(workPlcError);

    if (operation === "add") addUserInfoQuery({ field: "workplace", data });
    else if (operation === "update")
      updateNestedUserInfoQuery({ field: "workplace", data, docId });
  }

  // Password And Email

  function updatePasswordQuery({ currPassword, newPassword }) {
    dispatch(
      updatePassword({
        userId: activeUserId,
        body: {
          password: currPassword,
          newPassword,
        },
      })
    );
  }

  function updateEmailQuery({ password, currEmail, newEmail }) {
    dispatch(
      updateEmail({
        userId: activeUserId,
        body: {
          password,
          email: currEmail,
          newEmail,
        },
      })
    );
  }

  return {
    deleteUserInfoQuery,
    deleteUserNestedInfoQuery,
    /////////////////////
    getUserInfoQuery,
    addBirthPlaceQuery,
    addBirthDateQuery,
    addLivingPlaceQuery,
    addEducationQuery,
    addWorkplaceQuery,
    updatePasswordQuery,
    updateEmailQuery,
    //// errors ////
    workplaceError,
    birthDateError,
    educationError,
    livingPlaceError,
  };
}
