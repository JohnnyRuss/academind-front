import { createSlice } from '@reduxjs/toolkit';

/**
 Potal reducer is used for:
 * showing active post media
 * showing,save and manipulate update post data
 * showing,save and manipulate share post data
  is separated because, components which uses this reducer are separated too into the most top level component and are waiting for state change
 */
const portalSlice = createSlice({
  name: 'portal',
  initialState: {
    ////////////////////////
    // show post media modal
    mediaModalIsOpen: false,
    activeMediaIndex: '',
    mediaFiles: null,

    /////////////////////////
    // show update post modal
    updatePostLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    updatePostModalIsOpen: false,
    updateBlogPostModalIsOpen: false,
    updatePostMediaFiles: [],
    updatePostData: {
      _id: '',
      type: '',
      shared: '',
      authenticAuthorId: '',
      authenticAuthorImg: '',
      authenticAuthorName: '',
      authenticDescription: '',
      createdAt: '',
      description: '',
      title: '',
      article: '',
      categories: [],
      commentsAmount: '',
      tags: [],
    },

    ////////////////////////
    // show share post modal
    sharePostLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    sharePostModalIsOpen: false,
    sharePostData: {
      userName: '',
      createdAt: '',
      userImg: '',
      description: '',
      type: '',
      media: null,
      title: '',
      article: '',
      commentsCount: '',
      _id: '',
    },
  },
  reducers: {
    //////////////////////
    // Aactive Media Files
    setMediaModalOpen(state, action) {
      const { index, media } = action.payload;
      state.activeMediaIndex = index;
      state.mediaFiles = media;
      state.mediaModalIsOpen = true;
    },

    deactivateMediaModal(state) {
      state.mediaModalIsOpen = false;
      state.mediaFiles = null;
      state.activeMediaIndex = '';
    },

    ////////////////
    // Update Portal
    updatePost(state) {
      state.updatePostLoadingState.loading = true;
      state.updatePostLoadingState.error = false;
      state.updatePostLoadingState.message = '';
    },

    setUpdatePostModalOpen(state, { payload }) {
      Object.keys(payload).forEach((key) => (state.updatePostData[key] = payload[key]));
      state.updatePostMediaFiles = payload.media;
      state.updatePostModalIsOpen = true;
    },

    addTag(state, { payload }) {
      state.updatePostData.tags = [...state.updatePostData.tags, payload];
    },

    removeTag(state, { payload }) {
      state.updatePostData.tags = state.updatePostData.tags.filter((tag) => tag._id !== payload);
    },

    setUpdateFile(state, { payload }) {
      Object.values(payload)
        .filter(
          (file) =>
            !Object.values(state.updatePostMediaFiles).some(
              (existingFile) => existingFile?.name === file.name
            )
        )
        .map((file) => state.updatePostMediaFiles.push(file));
    },

    /**
     * during post updating we may get into existing media files which are type of string and represents the img url, or may we add new files whicj are type of object. So we need to fillter out both of them types
     */
    removeUpdateFiles(state, { payload }) {
      if (payload !== 'all') {
        if (typeof payload === 'object') {
          state.updatePostMediaFiles = state.updatePostMediaFiles.filter(
            (file) =>
              typeof file === 'string' || (typeof file === 'object' && file.name !== payload.name)
          );
        } else if (typeof payload === 'string') {
          state.updatePostMediaFiles = state.updatePostMediaFiles.filter(
            (file) => typeof file === 'object' || file !== payload
          );
        }
      } else state.updatePostMediaFiles = [];
    },

    resetUpdatePostModal(state) {
      state.updatePostModalIsOpen = false;
      state.updatePostMediaFiles = [];
      Object.keys(state.updatePostData).map((key) => (state.updatePostData[key] = ''));

      state.updatePostLoadingState.loading = false;
      state.updatePostLoadingState.error = false;
      state.updatePostLoadingState.message = '';
    },

    ///////////////
    // Share Portal
    sharePost(state) {
      state.sharePostLoadingState.loading = true;
      state.sharePostLoadingState.error = false;
      state.sharePostLoadingState.message = '';
    },

    setSharePostModalOpen(state, action) {
      Object.keys(action.payload).forEach(
        (key) => (state.sharePostData[key] = action.payload[key])
      );
      state.sharePostModalIsOpen = true;
    },

    resetSharePostModal(state) {
      state.sharePostModalIsOpen = false;
      Object.keys(state.sharePostData).map((key) => (state.sharePostData[key] = ''));

      state.sharePostLoadingState.loading = false;
      state.sharePostLoadingState.error = false;
      state.sharePostLoadingState.message = '';
    },
  },
});

export const portalReducer = portalSlice.reducer;
export const {
  // Aactive Media Files
  setMediaModalOpen,
  deactivateMediaModal,
  // Update Portal
  updatePost,
  setUpdatePostModalOpen,
  addTag,
  removeTag,
  setUpdateFile,
  removeUpdateFiles,
  resetUpdatePostModal,
  // Share Portal
  sharePost,
  setSharePostModalOpen,
  resetSharePostModal,
} = portalSlice.actions;
