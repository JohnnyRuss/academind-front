import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({ state, loading = true, error = false, message }) {
  state.loadingState.loading = loading;
  state.loadingState.error = error ? true : false;
  state.loadingState.message = error ? message : "";
}

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    createBlogPostError: {
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
    audience: "public",
    title: "",
    text: "",
    files: [],
    category: "",
    labels: [],
    tags: [],
    activeSelectedMedia: false,
    createPostIsOpen: false,
    createBlogPostIsOpen: false,
  },
  reducers: {
    // used for API Error
    setCreatePostError(state, { payload }) {
      console.log(payload);
      updateLoadingState({
        state,
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    setCreatePostIsOpen(state, { payload }) {
      state.createPostIsOpen = payload;
      if (payload === false) state.files = [];
    },

    setCreateBlogPostIsOpen(state, { payload }) {
      state.createBlogPostIsOpen = payload;
      if (payload === false) {
        state.text = "";
        state.title = "";
        state.files = [];
        state.labels = [];
        state.tags = [];
        state.category = "";
      }
    },

    setAudience(state, { payload }) {
      state.audience = payload;
    },

    setTitle(state, { payload }) {
      state.title = payload;
    },

    setText(state, { payload }) {
      state.text = payload;
    },

    setFile(state, { payload }) {
      Object.values(payload)
        .filter(
          (file) =>
            !Object.values(state.files).some(
              (existingFile) => existingFile.name === file.name
            )
        )
        .map((file) => state.files.push(file));
      state.activeSelectedMedia = true;
    },

    removeFiles(state, { payload }) {
      const url = payload;
      if (url !== "all")
        state.files = Object.values(state.files).filter(
          (file) => file.name !== url.name
        );
      else state.files = [];
      if (Object.values(state.files).length === 0)
        state.activeSelectedMedia = false;
    },

    addLabel(state, { payload }) {
      state.labels = [...state.labels, payload];
    },

    removeLabel(state, { payload }) {
      state.labels = state.labels.filter((label) => label !== payload);
    },

    setCategory(state, { payload }) {
      state.category = payload;
    },

    addTag(state, { payload }) {
      state.tags = [...state.tags, payload];
    },

    removeTag(state, { payload }) {
      state.tags = state.tags.filter((tag) => tag._id !== payload);
    },

    setCreateBlogPostError(state, { payload }) {
      state.createBlogPostError = payload;
    },

    resetCreateBlogPostErrorFragment(state, { payload: { target } }) {
      state.createBlogPostError[target] = {
        hasError: false,
        message: false,
      };
    },

    createPost(state) {
      updateLoadingState({ state });
    },

    resetCreatePost(state) {
      updateLoadingState({ state, loading: false });

      state.createBlogPostError = {
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

      state.audience = "friends";
      state.title = "";
      state.text = "";
      state.labels = [];
      state.category = "";
      state.tags = [];
      state.files = [];
      state.createPostIsOpen = false;
      state.createBlogPostIsOpen = false;
      state.activeSelectedMedia = false;
    },
  },
});

export const createPostReducer = createPostSlice.reducer;
export const {
  setCreatePostError,
  setCreatePostIsOpen,
  setCreateBlogPostIsOpen,
  setAudience,
  setTitle,
  setText,
  setFile,
  removeFiles,
  addLabel,
  removeLabel,
  setCategory,
  addTag,
  removeTag,
  setCreateBlogPostError,
  resetCreateBlogPostErrorFragment,
  createPost,
  resetCreatePost,
} = createPostSlice.actions;
