import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: '',
    },
    allConversations: [],
    activeConversation: {},
  },
  reducers: {
    getAllConversations() {},

    setAllConversations(state, { payload }) {
      state.allConversations = payload;
    },

    getLastConversation(state) {
      updateLoadingState({ state, key: 'loadingState', loading: true });
    },

    getConversation(state) {
      updateLoadingState({ state, key: 'loadingState', loading: true });
    },

    setActiveConversation(state, { payload }) {
      state.activeConversation = payload;
      updateLoadingState({ state, key: 'loadingState', loading: false });
    },

    deleteConversation(state) {},

    setDeletedConversation(state, { payload }) {
      state.allConversations = state.allConversations.filter((conv) => conv._id !== payload);
    },

    resetConversation(state) {
      state.activeConversation = {};
      state.allConversations = [];
    },
  },
});

export const conversationReducer = conversationSlice.reducer;
export const {
  getAllConversations,
  setAllConversations,
  getLastConversation,
  getConversation,
  setActiveConversation,
  deleteConversation,
  setDeletedConversation,
  resetConversation,
} = conversationSlice.actions;
