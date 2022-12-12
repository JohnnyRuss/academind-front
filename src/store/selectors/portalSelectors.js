import { createSelector } from "@reduxjs/toolkit";

export const selectMediaModalIsOpen = ({ portal }) => portal.mediaModalIsOpen;

export const selectActiveMediaIndex = ({ portal }) => portal.activeMediaIndex;

export const selectMediaFiles = ({ portal }) => portal.mediaModalIsOpen;

export const selectUpdatePostModalIsOpen = ({ portal }) =>
  portal.updatePostModalIsOpen;

const selectedSharePostPortal = ({ portal }) => ({
  sharePostModalIsOpen: portal.sharePostModalIsOpen,
  sharePostData: portal.sharePostData,
  shareAudience: portal.shareAudience,
  sharePostLoadingState: portal.sharePostLoadingState,
});

export const selectSharePostPortal = createSelector(
  selectedSharePostPortal,
  (memorised) => memorised
);

const selectedUpdateBlogPostPortal = ({ portal }) => ({
  updateBlogPostModalIsOpen: portal.updateBlogPostModalIsOpen,
  updatePostData: portal.updatePostData,
  updatePostMediaFiles: portal.updatePostMediaFiles,
  updatePostLoadingState: portal.updatePostLoadingState,
});

export const selectUpdateBlogPostPortal = createSelector(
  selectedUpdateBlogPostPortal,
  (memorised) => memorised
);

const selectedUpdatePostPortal = ({ portal }) => ({
  updatePostModalIsOpen: portal.updatePostModalIsOpen,
  updatePostData: portal.updatePostData,
  updatePostMediaFiles: portal.updatePostMediaFiles,
  updatePostLoadingState: portal.updatePostLoadingState,
});

export const selectUpdatePostPortal = createSelector(
  selectedUpdatePostPortal,
  (memorised) => memorised
);
