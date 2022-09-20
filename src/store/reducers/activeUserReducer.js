import { createSlice } from '@reduxjs/toolkit';

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
      createdAt: null,
      isAuthenticated: false,
    },
  },
  reducers: {
    login(state) {
      console.log('runs login creator');
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    resetLoadingState(state) {
      state.loadingState.loading = null;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setActiveUser(state, { payload }) {
      const temp = {
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        profileImg: payload.profileImg,
        createdAt: payload.createdAt,
        isAuthenticated: true,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.setItem('academind_passport', JSON.stringify(payload.token));

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    getActiveUser() {},

    resetActiveUser(state) {
      const temp = {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        profileImg: '',
        createdAt: null,
        isAuthenticated: false,
      };

      Object.keys(state).map((key) => (state[key] = temp[key]));
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
  resetActiveUser,
} = activeUserSlice.actions;
