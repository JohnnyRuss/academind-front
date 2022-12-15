import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    target: "showAll",
    editableTarget: "",
    isEditing: false,
  },
  reducers: {
    setTarget(state, { payload }) {
      state.target = payload;
    },

    setIsEditing(state, { payload }) {
      state.editableTarget = payload;
      state.isEditing = true;
    },

    resetIsEditing(state) {
      state.editableTarget = "";
      state.isEditing = false;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setTarget, setIsEditing, resetIsEditing } =
  settingsSlice.actions;
