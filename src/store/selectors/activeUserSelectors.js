import { createSelector } from "@reduxjs/toolkit";

/* ============================================= */
/* ============== Loading States ============== */
/* =========================================== */

export const selectActiveUserLoadingState = ({ activeUser }) =>
  activeUser.loadingState;

export const selectActiveUserRegistrationLoadingState = ({ activeUser }) =>
  activeUser.registerLoadingState;

/* ============================================= */
/* ============== Authentication ============== */
/* =========================================== */

// existing registration request
export const selectIsExistingRequestAndSuccessMessage = ({ activeUser }) => ({
  isExistingRegister: activeUser.isExistingRegister,
  successfullRegistration: activeUser.successfullRegistration,
});

export const selectSentRegistrationStatus = ({ activeUser }) =>
  activeUser.registrationSuccessfullySent;

/* ============================================= */
/* =================== User =================== */
/* =========================================== */

export const selectActiveUserId = ({ activeUser }) => activeUser.user._id;

const selectedActiveUser = ({ activeUser }) => activeUser.user;

export const selectActiveUser = createSelector(
  selectedActiveUser,
  (memorised) => memorised
);

export const selectActiveUserShortInfo = ({ activeUser }) => ({
  userName: activeUser.user.userName,
  email: activeUser.user.email,
  image: activeUser.user.profileImg,
  _id: activeUser.user._id,
});
