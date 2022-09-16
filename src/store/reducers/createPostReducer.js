import { createSlice } from '@reduxjs/toolkit';

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: '',
    },
    files: [],
    activeSelectedMedia: false,
    isOpen: false,
  },
  reducers: {
    setIsOpen(state, { payload }) {
      state.isOpen = payload;
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
      state.isOpen = false;
    },
  },
});

export const createPostReducer = createPostSlice.reducer;
export const { setIsOpen, setFile, removeFiles, createPost, resetCreatePost } =
  createPostSlice.actions;
