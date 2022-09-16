import { createSlice } from '@reduxjs/toolkit';

const portalSlice = createSlice({
  name: 'portal',
  initialState: {
    // show post media files modal
    mediaModalIsOpen: false,
    activeMediaIndex: null,
    mediaFiles: null,
    // show update post modal
    updatePostModalIsOpen: false,
    updatePostMediaFiles: [],
    updatePostLoadingState: {
      loading: null,
      error: false,
      message: '',
    },
    updatePostData: {
      description: '',
      type: '',
      shareDescription: '',
      title: '',
      article: '',
      commentsAmount: '',
    },
    // show share post modal
    sharePostModalIsOpen: false,
    sharePostData: {
      userName: '',
      createdAt: '',
      userImg: '',
      description: '',
      type: '',
      media: null,
      shareDescription: '',
      title: '',
      article: '',
      comments: null,
      _id: '',
    },
  },
  reducers: {
    // Aactive Media Files
    setMediaModalOpen(state, action) {
      const { index, media } = action.payload;
      state.activeMediaIndex = index;
      state.mediaFiles = media;
      state.mediaModalIsOpen = true;
    },

    deactivateMediaModal(state) {
      state.mediaModalIsOpen = false;
    },

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

      state.updatePostLoadingState.loading = true;
      state.updatePostLoadingState.error = false;
      state.updatePostLoadingState.message = '';
    },

    // Share Portal
    setSharePostModalOpen(state, action) {
      Object.keys(action.payload).forEach(
        (key) => (state.sharePostData[key] = action.payload[key])
      );
      state.sharePostModalIsOpen = true;
    },

    deactivateSharePostModal(state) {
      state.sharePostModalIsOpen = false;
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
  setUpdateFile,
  removeUpdateFiles,
  resetUpdatePostModal,
  // Share Portal
  setSharePostModalOpen,
  deactivateSharePostModal,
} = portalSlice.actions;
