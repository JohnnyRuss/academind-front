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
    updatePostData: {
      description: '',
      type: '',
      media: '',
      shareDescription: '',
      title: '',
      article: '',
      comments: null,
    },
    updatePostMedia: null,
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
    setMediaModalOpen(state, action) {
      const { index, media } = action.payload;
      state.activeMediaIndex = index;
      state.mediaFiles = media;
      state.mediaModalIsOpen = true;
    },

    deactivateMediaModal(state) {
      state.mediaModalIsOpen = false;
    },

    setUpdatePostModalOpen(state, action) {
      Object.keys(action.payload).forEach(
        (key) => (state.updatePostData[key] = action.payload[key])
      );
      state.updatePostModalIsOpen = true;
    },

    deactivateUpdatePostModal(state) {
      state.updatePostModalIsOpen = false;
    },

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
  setMediaModalOpen,
  deactivateMediaModal,
  setUpdatePostModalOpen,
  deactivateUpdatePostModal,
  setSharePostModalOpen,
  deactivateSharePostModal,
} = portalSlice.actions;
