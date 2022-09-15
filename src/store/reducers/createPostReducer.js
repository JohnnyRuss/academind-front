import { createSlice } from '@reduxjs/toolkit';

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    file: [],
    activeSelectedMedia: false,
  },
  reducers: {
    setFile(state, action) {
      console.log(action.payload);
      Object.values(action.payload).filter((f) => state.file.push(f));
      state.activeSelectedMedia = true;
    },

    removeFiles(state, action) {
      const url = action.payload;
      if (url !== 'all') state.file = Object.values(state.file).filter((f) => f.name !== url.name);
      else state.file = [];
      if (Object.values(state.file).length === 0) state.activeSelectedMedia = false;
    },
  },
});

export const createPostReducer = createPostSlice.reducer;
export const { setFile, removeFiles } = createPostSlice.actions;
