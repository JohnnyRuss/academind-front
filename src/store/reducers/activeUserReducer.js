import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: "",
    },
    
    registerLoadingState: {
      loading: false,
      error: false,
      message: "",
    },

    user: {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      profileImg: "",
      coverImg: "",
      role: "",
      createdAt: null,
      isAuthenticated: false,
    },

    isExistingRegister: false,
    successfullRegistration: false,

    registrationSuccessfullySent: null,
  },
  reducers: {
    resetLoadingState(state, { payload }) {
      state[payload].loading = null;
      state[payload].error = false;
      state[payload].message = "";
    },

    setLoadingStateError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = true;
      state.loadingState.message = payload.message;
    },

    resetLoadingStateError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    // ===================================== //
    // ========== Authentication ========== //
    // =================================== //

    setRegistrationError(state, { payload }) {
      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = true;
      state.registerLoadingState.message = payload.message;
    },

    resetRegistrationError(state) {
      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
      state.isExistingRegister = false;
      state.successfullRegistration = false;
      state.registrationSuccessfullySent = null;
    },

    resetRegistrationpProccess(state) {
      state.isExistingRegister = false;
      state.successfullRegistration = false;
    },

    checkExistingRegister(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setIsExistingRegister(state, { payload }) {
      state.isExistingRegister = payload.isExistingRequest;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    sendRegisterPasswordConfirm(state) {
      state.registerLoadingState.loading = true;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    setRegisterSuccess(state, { payload }) {
      state.successfullRegistration = payload.success;

      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    login(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    logOut(state) {
      const temp = {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        profileImg: "",
        coverImg: "",
        createdAt: null,
        role: "",
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.removeItem("academind_passport");
    },

    resetActiveUser(state) {
      const temp = {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        profileImg: "",
        coverImg: "",
        createdAt: null,
        role: "",
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
    },

    sendRegistrationRequest(state) {
      state.registerLoadingState.loading = true;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    setRegistrationRequestSuccess(state) {
      state.registrationSuccessfullySent = true;

      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    // =========================== //
    // ========== User ========== //
    // ========================= //

    setActiveUser(state, { payload }) {
      const temp = {
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        profileImg: payload.profileImg,
        coverImg: payload.coverImg,
        createdAt: payload.createdAt,
        role: payload.role,
        isAuthenticated: true,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.setItem(
        "academind_passport",
        JSON.stringify(payload.accessToken)
      );

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    getActiveUser() {},

    setUserNewEmail(state, { payload }) {
      state.user.email = payload;
    },
  },
});

export default activeUserSlice.reducer;
export const {
  resetLoadingState,
  setLoadingStateError,
  resetLoadingStateError,
  // authenntication
  setRegistrationError,
  resetRegistrationError,
  resetRegistrationpProccess,
  checkExistingRegister,
  setIsExistingRegister,
  sendRegisterPasswordConfirm,
  setRegisterSuccess,
  login,
  logOut,
  sendRegistrationRequest,
  setRegistrationRequestSuccess,
  // user
  resetActiveUser,
  setActiveUser,
  setUpdatedUserCover,
  getActiveUser,
  setUserNewEmail,
} = activeUserSlice.actions;
