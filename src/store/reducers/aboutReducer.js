import { createSlice } from '@reduxjs/toolkit';

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    navTarget: 'basics',
    target: '',
    active: false,
    activeOpt: false,
    activeOptTarget: '',
    updateCredentials: {},
    proccessUpdate: false,
  },
  reducers: {
    setTarget(state, action) {
      state.active = true;
      state.target = action.payload;

      if (state.proccessUpdate) {
        state.proccessUpdate = false;
        state.updateCredentials = {};
      }
    },

    setNavTarget(state, action) {
      state.navTarget = action.payload;
    },

    deActivateTarget(state) {
      state.active = false;
      state.target = '';

      if (state.proccessUpdate) {
        state.proccessUpdate = false;
        state.updateCredentials = {};
      }
    },

    activateOption(state, action) {
      if (state.activeOpt && state.activeOptTarget === action.payload) {
        state.activeOpt = false;
        state.activeOptTarget = '';
      } else {
        state.activeOpt = true;
        state.activeOptTarget = action.payload;
      }
    },

    setUpdateCredentials(state, action) {
      const { credentials, target } = action.payload;
      state.activeOpt = false;
      state.activeOptTarget = '';
      state.updateCredentials = credentials;
      state.target = target;
      state.active = true;
      state.proccessUpdate = true;
    },
  },
});

export const aboutReducer = aboutSlice.reducer;
export const { setTarget, setNavTarget, deActivateTarget, activateOption, setUpdateCredentials } =
  aboutSlice.actions;
