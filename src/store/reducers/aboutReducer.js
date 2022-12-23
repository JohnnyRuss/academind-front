import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    // dom: {
    //   navTarget: 'basics',
    //   target: '',
    //   active: false,
    //   activeOpt: false,
    //   activeOptTarget: '',
    //   updateCredentials: {},
    //   proccessUpdate: false,
    // },
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    data: null,
  },
  reducers: {
    /////////////////////////////////
    //////////// DOM ///////////////
    ///////////////////////////////
    // setNavTarget(state, { payload }) {
    //   state.dom.navTarget = payload;
    // },

    // setTarget(state, { payload }) {
    //   state.dom.active = true;
    //   state.dom.target = payload;

    //   if (state.dom.proccessUpdate) {
    //     state.dom.proccessUpdate = false;
    //     state.dom.updateCredentials = {};
    //   }
    // },

    // deActivateTarget(state) {
    //   state.dom.active = false;
    //   state.dom.target = '';

    //   if (state.dom.proccessUpdate) {
    //     state.dom.proccessUpdate = false;
    //     state.dom.updateCredentials = {};
    //   }
    // },

    // // toggles option window
    // activateOption(state, { payload }) {
    //   if (state.dom.activeOpt && state.dom.activeOptTarget === payload) {
    //     state.dom.activeOpt = false;
    //     state.dom.activeOptTarget = '';
    //   } else {
    //     state.dom.activeOpt = true;
    //     state.dom.activeOptTarget = payload;
    //   }
    // },

    // setUpdateCredentials(state, { payload }) {
    //   const { credentials, target } = payload;
    //   state.dom.activeOpt = false;
    //   state.dom.activeOptTarget = '';
    //   state.dom.updateCredentials = credentials;
    //   state.dom.target = target;
    //   state.dom.active = true;
    //   state.dom.proccessUpdate = true;
    // },

    //////////////////////////////////
    //////////// DATA ///////////////
    ////////////////////////////////
    getUserAboutData(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setUserAboutData(state, { payload }) {
      state.data = payload;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = payload.message;
    },

    resetData(state) {
      state.data = null;
    },

    setAboutError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = true;
      state.loadingState.message = payload.message;
    },
  },
});

export const aboutReducer = aboutSlice.reducer;
export const {
  // setTarget,
  // setNavTarget,
  // deActivateTarget,
  // activateOption,
  // setUpdateCredentials,
  getUserAboutData,
  setUserAboutData,
  resetData,
  setAboutError,
} = aboutSlice.actions;
