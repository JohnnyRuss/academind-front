import { createSelector } from '@reduxjs/toolkit';

const selectedConversations = ({ conversation }) => conversation.allConversations;

export const selectAllConversations = createSelector(
  selectedConversations,
  (selectedData) => selectedData
);

const selectedActiveConversation = ({ conversation }) => ({
  conversation: conversation.activeConversation,
  loadingState: conversation.loadingState,
});

export const selectActiveConversation = createSelector(selectedActiveConversation, (con) => con);
