import { createSlice } from '@reduxjs/toolkit';

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: '',
    },
    files: [],
    activeSelectedMedia: false,
    createPostIsOpen: false,
    createBlogPostIsOpen: false,
  },
  reducers: {
    setCreatePostIsOpen(state, { payload }) {
      state.createPostIsOpen = payload;
    },

    setCreateBlogPostIsOpen(state, { payload }) {
      state.createBlogPostIsOpen = payload;
    },

    setFile(state, { payload }) {
      Object.values(payload)
        .filter(
          (file) =>
            !Object.values(state.files).some((existingFile) => existingFile.name === file.name)
        )
        .map((file) => state.files.push(file));
      state.activeSelectedMedia = true;
    },

    removeFiles(state, action) {
      const url = action.payload;
      if (url !== 'all')
        state.files = Object.values(state.files).filter((file) => file.name !== url.name);
      else state.files = [];
      if (Object.values(state.files).length === 0) state.activeSelectedMedia = false;
    },

    createPost(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    resetCreatePost(state) {
      state.loadingState = {
        loading: null,
        error: false,
        message: '',
      };
      state.files = [];
      state.activeSelectedMedia = false;
      state.createPostIsOpen = false;
    },
  },
});

export const createPostReducer = createPostSlice.reducer;
export const {
  setCreatePostIsOpen,
  setCreateBlogPostIsOpen,
  setFile,
  removeFiles,
  createPost,
  resetCreatePost,
} = createPostSlice.actions;
