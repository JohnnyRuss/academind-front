import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    target: "showAll",
    editableTarget: "",
    isEditing: false,
    headingTitle: "all details",

    // updateables
    updateables: {
      birthDate: {
        birthDate: "",
      },

      birthPlace: {
        country: "",
        city: "",
      },

      livingPlace: {
        country: "",
        city: "",
      },

      education: {
        collage: "",
        faculty: "",
        degree: "",
        description: "",
        years: {
          from: "",
          to: "",
        },
      },

      workplace: {
        company: "",
        position: "",
        description: "",
        workingYears: {
          from: "",
          to: "",
        },
      },
    },
  },
  reducers: {
    setTarget(state, { payload }) {
      state.target = payload.key;
      state.headingTitle = payload.label;
    },

    setIsEditing(state, { payload }) {
      state.editableTarget = payload.key;
      state.headingTitle = `update ${payload.label}`;
      state.isEditing = true;
    },

    resetIsEditing(state) {
      state.editableTarget = "";
      state.isEditing = false;

      const existingTitle = state.headingTitle;
      state.headingTitle = existingTitle.replace(/update|add/, () => "");
    },

    // updateables

    updateBirthdate(state, { payload }) {
      state.updateables.birthDate = payload;
    },

    resetBirthdate(state) {
      state.updateables.birthDate = {
        birthDate: "",
      };
    },

    updateBirthplace(state, { payload }) {
      state.updateables.birthPlace = payload;
    },

    resetBirthplace(state) {
      state.updateables.birthPlace = {
        country: "",
        city: "",
      };
    },

    updateLivingPlace(state, { payload }) {
      state.updateables.livingPlace = payload;
    },

    resetLivingPlace(state) {
      state.updateables.livingPlace = {
        country: "",
        city: "",
      };
    },

    updateEducation(state, { payload }) {
      state.updateables.education = payload;
    },

    resetEducation(state) {
      state.updateables.education = {
        collage: "",
        faculty: "",
        degree: "",
        description: "",
        years: {
          from: "",
          to: "",
        },
      };
    },

    updateWorkplace(state, { payload }) {
      state.updateables.workplace = payload;
    },

    resetWorkplace(state) {
      state.updateables.workplace = {
        company: "",
        position: "",
        description: "",
        workingYears: {
          from: "",
          to: "",
        },
      };
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const {
  setTarget,
  setIsEditing,
  resetIsEditing,
  // updateablse
  updateBirthdate,
  resetBirthdate,
  updateBirthplace,
  resetBirthplace,
  updateLivingPlace,
  resetLivingPlace,
  updateEducation,
  resetEducation,
  updateWorkplace,
  resetWorkplace,
} = settingsSlice.actions;
