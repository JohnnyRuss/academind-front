import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: '',
    },
    user: {
      _id: '',
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      profileImg: '',
      coverImg: '',
      createdAt: null,
      isAuthenticated: false,
    },
  },
  reducers: {
    login(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    resetLoadingState(state) {
      updateLoadingState(state, 'loadingState', false);
    },

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
        isAuthenticated: true,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.setItem('academind_passport', JSON.stringify(payload.token));

      updateLoadingState(state, 'loadingState', false);
    },

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    getActiveUser() {},

    logOut(state) {
      const temp = {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        profileImg: '',
        coverImg: '',
        createdAt: null,
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.removeItem('academind_passport');
    },
  },
});

export const activeUserReducer = activeUserSlice.reducer;
export const {
  login,
  resetLoadingState,
  setActiveUser,
  setUpdatedUserCover,
  getActiveUser,
  logOut,
} = activeUserSlice.actions;
