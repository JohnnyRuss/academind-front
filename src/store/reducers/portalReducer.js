import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers/index';

/**
 Potal reducer is used for:
 * 1.1) show active post media
 * 1.2) update post or blogPost
 * 1.3) share post or blogPost
  is separated because, components which uses this reducer are separated too and based on operation may use dufferent reducer, for example for post creation they use createPostReducer.
  the goal of this reducer is to save and exchange data during share or update process, even for update existing data state
 */
const portalSlice = createSlice({
  name: 'portal',
  initialState: {
    //////////////////////////////
    /// show post media modal ///
    ////////////////////////////
    mediaModalIsOpen: false,
    activeMediaIndex: '',
    mediaFiles: null,

    ///////////////////////////////
    /// show update post modal ///
    /////////////////////////////
    updatePostLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    updatePostModalIsOpen: false,
    updateBlogPostModalIsOpen: false,
    updatePostMediaFiles: [],
    updatePostData: {
      audience: '',
      _id: '',
      type: '',
      shared: '',
      authenticAuthorId: '',
      authenticAuthorImg: '',
      authenticAuthorName: '',
      authenticDescription: '',
      authenticTags: [],
      createdAt: '',
      description: '',
      title: '',
      article: '',
      categories: [],
      tags: [],
    },

    //////////////////////////////
    /// show share post modal ///
    ////////////////////////////
    sharePostLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    sharePostModalIsOpen: false,
    sharePostData: {
      _id: '',
      type: '',
      authenticType: '',
      author: {
        userName: '',
        profileImg: '',
      },
      createdAt: '',
      description: '',
      media: null,
      tags: [],
      authenticTags: [],
      article: '',
      title: '',
      categories: [],
      audience: '',
    },
    shareAudience: 'friends',
  },
  reducers: {
    ////////////////////////////
    /// Aactive Media Files ///
    //////////////////////////
    setMediaModalOpen(state, { payload }) {
      const { index, media } = payload;
      state.activeMediaIndex = index;
      state.mediaFiles = media;
      state.mediaModalIsOpen = true;
    },

    deactivateMediaModal(state) {
      state.mediaModalIsOpen = false;
      state.mediaFiles = null;
      state.activeMediaIndex = '';
    },

    //////////////////////
    /// Update Portal ///
    ////////////////////
    updatePost(state) {
      updateLoadingState({ state, key: 'updatePostLoadingState', loading: true });
    },

    setUpdatePostModalOpen(state, { payload }) {
      updateState(state, 'updatePostData', payload);
      state.updatePostMediaFiles = payload.media;
      state.updatePostModalIsOpen = true;
    },

    setUpdateBlogPostModalOpen(state, { payload }) {
      updateState(state, 'updatePostData', payload);

      state.updatePostMediaFiles = payload.media;
      state.updateBlogPostModalIsOpen = true;
    },

    setUpdateAudience(state, { payload }) {
      state.updatePostData.audience = payload;
    },

    setTitle(state, { payload }) {
      state.updatePostData.title = payload;
    },

    setText(state, { payload }) {
      state.updatePostData.article = payload;
    },

    addCategory(state, { payload }) {
      state.updatePostData.categories = [...state.updatePostData.categories, payload];
    },

    removeCategory(state, { payload }) {
      state.updatePostData.categories = state.updatePostData.categories.filter(
        (category) => category !== payload
      );
    },

    addUpdateTag(state, { payload }) {
      addTag(state, 'updatePostData', payload);
    },

    removeUpdateTag(state, { payload }) {
      removeTag(state, 'updatePostData', payload);
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

    resetUpdateState(state) {
      resetState(state);
    },

    ////////////////////
    /// Share Portal ///
    ////////////////////
    sharePost(state) {
      updateLoadingState({ state, key: 'sharePostLoadingState', loading: true });
    },

    setSharePostModalOpen(state, { payload }) {
      updateState(state, 'sharePostData', payload);
      state.sharePostModalIsOpen = true;
    },

    setShareAudience(state, { payload }) {
      state.shareAudience = payload;
    },

    addShareTag(state, { payload }) {
      addTag(state, 'sharePostData', payload);
    },

    removeShareTag(state, { payload }) {
      removeTag(state, 'sharePostData', payload);
    },

    resetSharePostModal(state) {
      state.sharePostModalIsOpen = false;
      Object.keys(state.sharePostData).map((key) => (state.sharePostData[key] = ''));
      state.shareAudience = 'friends';

      updateLoadingState({ state, key: 'sharePostLoadingState', loading: false });
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
  setUpdateBlogPostModalOpen,
  setUpdateAudience,
  setTitle,
  setText,
  addCategory,
  removeCategory,
  addUpdateTag,
  removeUpdateTag,
  setUpdateFile,
  removeUpdateFiles,
  resetUpdateState,
  // Share Portal
  sharePost,
  setSharePostModalOpen,
  setShareAudience,
  addShareTag,
  removeShareTag,
  resetSharePostModal,
} = portalSlice.actions;

function addTag(state, key, payload) {
  state[key].tags = [...state[key].tags, payload];
}

function removeTag(state, key, payload) {
  state[key].tags = state[key].tags.filter((tag) => tag._id !== payload);
}

function updateState(state, field, payload) {
  Object.keys(state[field]).forEach((key) => (state[field][key] = payload[key]));
}

function resetState(state) {
  if (state.updatePostModalIsOpen) state.updatePostModalIsOpen = false;
  else if (state.updateBlogPostModalIsOpen) state.updateBlogPostModalIsOpen = false;

  updateLoadingState({ state, key: 'updatePostLoadingState', loading: false });
  state.updatePostMediaFiles = [];
  Object.keys(state.updatePostData).map((key) => (state.updatePostData[key] = ''));
}
