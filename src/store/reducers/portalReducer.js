import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  key,
  loading = true,
  error = false,
  message,
}) {
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
}

/**
 Potal reducer is used for:
 * 1.1) show active post media
 * 1.2) update post or blogPost
 * 1.3) share post or blogPost
  is separated because, components which uses this reducer are separated too and based on operation may use dufferent reducer, for example for post creation they use createPostReducer.
  the goal of this reducer is to save and exchange data during share or update process, even for update existing data state
 */
const portalSlice = createSlice({
  name: "portal",
  initialState: {
    //////////////////////////////
    /// show post media modal ///
    ////////////////////////////
    mediaModalIsOpen: false,
    activeMediaIndex: "",
    mediaFiles: null,

    ///////////////////////////////
    /// show update post modal ///
    /////////////////////////////
    updatePostLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    updatePostModalIsOpen: false,
    updateBlogPostModalIsOpen: false,
    updatePostMediaFiles: [],
    updatePostData: {
      audience: "",
      _id: "",
      type: "",
      shared: "",
      authenticAuthorId: "",
      authenticAuthorImg: "",
      authenticAuthorName: "",
      authenticDescription: "",
      authenticTags: [],
      createdAt: "",
      description: "",
      title: "",
      article: "",
      labels: [],
      category: "",
      tags: [],
    },

    //////////////////////////////
    /// show share post modal ///
    ////////////////////////////
    sharePostLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    sharePostModalIsOpen: false,
    sharePostData: {
      _id: "",
      type: "",
      authenticType: "",
      author: {
        userName: "",
        profileImg: "",
      },
      createdAt: "",
      description: "",
      media: null,
      tags: [],
      authenticTags: [],
      article: "",
      title: "",
      labels: [],
      category: "",
      audience: "",
    },
    updateBlogPostError: {
      error: false,
      title: {
        hasError: false,
        message: "",
      },
      labels: {
        hasError: false,
        message: "",
      },
      category: {
        hasError: false,
        message: "",
      },
      article: {
        hasError: false,
        message: "",
      },
    },
    shareAudience: "public",
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
      state.activeMediaIndex = "";
    },

    //////////////////////
    /// Update Portal ///
    ////////////////////
    setUpdateBlogPostError(state, { payload }) {
      state.updateBlogPostError = payload;
    },

    resetUpdateBlogPostErrorFragment(state, { payload: { target } }) {
      state.updateBlogPostError[target] = {
        hasError: false,
        message: false,
      };
    },

    setUpdatePostError(state, { payload }) {
      updateLoadingState({
        state,
        key: "updatePostLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    updatePost(state) {
      updateLoadingState({
        state,
        key: "updatePostLoadingState",
      });
    },

    setUpdatePostModalOpen(state, { payload }) {
      Object.keys(state.updatePostData).forEach(
        (key) => (state.updatePostData[key] = payload[key])
      );
      state.updatePostMediaFiles = payload.media;
      state.updatePostModalIsOpen = true;
    },

    setUpdateBlogPostModalOpen(state, { payload }) {
      Object.keys(state.updatePostData).forEach(
        (key) => (state.updatePostData[key] = payload[key])
      );

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
      if (payload) state.updatePostData.article = payload;
    },

    addLabel(state, { payload }) {
      state.updatePostData.labels = [...state.updatePostData.labels, payload];
    },

    removeLabel(state, { payload }) {
      state.updatePostData.labels = state.updatePostData.labels.filter(
        (label) => label !== payload
      );
    },

    addCategory(state, { payload }) {
      state.updatePostData.category = payload;
    },

    addUpdateTag(state, { payload }) {
      addTag(state, "updatePostData", payload);
    },

    removeUpdateTag(state, { payload }) {
      removeTag(state, "updatePostData", payload);
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
      if (payload !== "all") {
        if (typeof payload === "object") {
          state.updatePostMediaFiles = state.updatePostMediaFiles.filter(
            (file) =>
              typeof file === "string" ||
              (typeof file === "object" && file.name !== payload.name)
          );
        } else if (typeof payload === "string") {
          state.updatePostMediaFiles = state.updatePostMediaFiles.filter(
            (file) => typeof file === "object" || file !== payload
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
    setSharePostError(state, { payload }) {
      updateLoadingState({
        state,
        key: "sharePostLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    sharePost(state) {
      updateLoadingState({
        state,
        key: "sharePostLoadingState",
      });
    },

    setSharePostModalOpen(state, { payload }) {
      Object.keys(state.sharePostData).forEach(
        (key) => (state.sharePostData[key] = payload[key])
      );

      state.sharePostModalIsOpen = true;
    },

    setShareAudience(state, { payload }) {
      state.shareAudience = payload;
    },

    addShareTag(state, { payload }) {
      addTag(state, "sharePostData", payload);
    },

    removeShareTag(state, { payload }) {
      removeTag(state, "sharePostData", payload);
    },

    resetSharePostModal(state) {
      state.sharePostModalIsOpen = false;

      Object.keys(state.sharePostData).map(
        (key) => (state.sharePostData[key] = "")
      );

      state.shareAudience = "public";

      updateLoadingState({
        state,
        key: "sharePostLoadingState",
        loading: false,
      });
    },
  },
});

export const portalReducer = portalSlice.reducer;

export const {
  // Aactive Media Files
  setMediaModalOpen,
  deactivateMediaModal,
  // Update Portal
  setUpdateBlogPostError,
  resetUpdateBlogPostErrorFragment,
  setUpdatePostError,
  updatePost,
  setUpdatePostModalOpen,
  setUpdateBlogPostModalOpen,
  setUpdateAudience,
  setTitle,
  setText,
  addLabel,
  removeLabel,
  addCategory,
  addUpdateTag,
  removeUpdateTag,
  setUpdateFile,
  removeUpdateFiles,
  resetUpdateState,
  // Share Portal
  setSharePostError,
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

function resetState(state) {
  if (state.updatePostModalIsOpen) state.updatePostModalIsOpen = false;
  else if (state.updateBlogPostModalIsOpen)
    state.updateBlogPostModalIsOpen = false;

  updateLoadingState({ state, key: "updatePostLoadingState", loading: false });
  state.updatePostMediaFiles = [];
  Object.keys(state.updatePostData).map(
    (key) => (state.updatePostData[key] = "")
  );

  state.updateBlogPostError = {
    error: false,
    title: {
      hasError: false,
      message: "",
    },
    labels: {
      hasError: false,
      message: "",
    },
    category: {
      hasError: false,
      message: "",
    },
    article: {
      hasError: false,
      message: "",
    },
  };
}
