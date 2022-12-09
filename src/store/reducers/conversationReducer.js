import { createSlice } from "@reduxjs/toolkit";
import { updateLoadingState } from "./helpers";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
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
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    getConversation(state) {
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    setActiveConversation(state, { payload }) {
      state.activeConversation = payload;
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    sendMessage() {},

    setNewMessage(state, { payload }) {
      const { conversation: conversationId } = payload;

      state.allConversations
        .find((conversation) => conversation._id === conversationId)
        ?.messages.push(payload);

      if (state.activeConversation._id === conversationId)
        state.activeConversation.messages.push(payload);
    },

    deleteConversation() {},

    setDeletedConversation(state, { payload }) {
      state.allConversations = state.allConversations.filter(
        (conv) => conv._id !== payload
      );
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
  sendMessage,
  setNewMessage,
  deleteConversation,
  setDeletedConversation,
  resetConversation,
} = conversationSlice.actions;
