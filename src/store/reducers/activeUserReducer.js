import { createSlice } from '@reduxjs/toolkit';

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    profileImg: '',
    createdAt: null,
    isAuthenticated: false,
  },
  reducers: {
    getActiveUser() {},

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

      Object.keys(state).map((key) => (state[key] = temp[key]));
      localStorage.setItem('academind_passport', JSON.stringify(payload.token));
    },

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
export const { getActiveUser, setActiveUser, resetActiveUser } = activeUserSlice.actions;
