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
    getAllLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    allConversations: [],
    activeConversation: null,
  },
  reducers: {
    getAllConversations(state) {
      updateLoadingState({ state, key: "getAllLoadingState", loading: true });
    },

    setAllConversations(state, { payload }) {
      state.allConversations = payload;
      updateLoadingState({ state, key: "getAllLoadingState", loading: false });
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

      if (state.activeConversation?._id === conversationId)
        state.activeConversation.messages.push(payload);
    },

    deleteConversation() {},

    setDeletedConversation(state, { payload }) {
      state.allConversations = state.allConversations.filter(
        (conv) => conv?._id !== payload
      );

      if (
        payload === state.activeConversation?._id &&
        state.allConversations[0]
      )
        state.activeConversation = state.allConversations[0];
      else if (!state.allConversations[0]) state.activeConversation = null;
    },

    markAsRead() {},

    setMarkAsRead(state, { payload }) {
      const { conversationId, adressatId } = payload;
      if (state.activeConversation?._id === conversationId)
        state.activeConversation?.messages
          .filter((msg) => msg.isRead === false && msg.author === adressatId)
          .forEach((msg) => (msg.isRead = true));

      state.allConversations
        .find((conv) => conv._id === conversationId)
        ?.messages.filter(
          (msg) => msg.isRead === false && msg.author === adressatId
        )
        .forEach((msg) => (msg.isRead = true));
    },

    resetConversation(state) {
      state.activeConversation = null;
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
  markAsRead,
  setMarkAsRead,
  deleteConversation,
  setDeletedConversation,
  resetConversation,
} = conversationSlice.actions;
