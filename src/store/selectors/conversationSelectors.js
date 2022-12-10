import { createSelector } from "@reduxjs/toolkit";

const selectedConversations = ({ conversation }) => ({
  allConversations: conversation.allConversations,
  allConversationState: conversation.getAllLoadingState,
});

export const selectAllConversations = createSelector(
  selectedConversations,
  (selectedData) => selectedData
);

const selectedActiveConversation = ({ conversation }) => ({
  conversation: conversation.activeConversation,
  conversationState: conversation.loadingState,
});

export const selectActiveConversation = createSelector(
  selectedActiveConversation,
  (con) => con
);

export const selectConversationById = ({ conversation }, id) =>
  conversation.allConversations.find((conversation) => conversation._id === id);

export const selectConversationState = ({ conversation }) =>
  conversation.loadingState;

export const selectAllConversationState = ({ conversation }) =>
  conversation.getAllLoadingState;
