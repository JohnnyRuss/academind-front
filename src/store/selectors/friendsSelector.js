import { createSelector } from "@reduxjs/toolkit";

const selectedPendingRequestsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  pendingRequests: friends.pendingRequests,
  searchKey: friends.searchKey,
});

export const selectPendingRequestsPageState = createSelector(
  selectedPendingRequestsPageState,
  (memorised) => memorised
);

const selectedSentRequestsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  sentRequests: friends.sentRequests,
  searchKey: friends.searchKey,
});

export const selectSentRequestsPageState = createSelector(
  selectedSentRequestsPageState,
  (memorised) => memorised
);

const selectedAllFriendsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  allFriends: friends.allFriends,
  searchKey: friends.searchKey,
});

export const selectAllFriendsPageState = createSelector(
  selectedAllFriendsPageState,
  (memorised) => memorised
);
