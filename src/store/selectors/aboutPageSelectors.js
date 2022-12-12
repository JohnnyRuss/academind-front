import { createSelector } from "@reduxjs/toolkit";

const selectedAboutUserData = ({ aboutPage }) => aboutPage.data;

export const selectAboutUserData = createSelector(
  selectedAboutUserData,
  (memorised) => memorised
);

export const selectAboutUpdateCredentials = ({ aboutPage }) =>
  aboutPage.dom.updateCredentials;

export const selectAboutProccessUpdate = ({ aboutPage }) =>
  aboutPage.dom.proccessUpdate;

export const selectAboutActive = ({ aboutPage }) =>
  aboutPage.dom.proccessUpdate;

export const selectAboutTarget = ({ aboutPage }) =>
  aboutPage.dom.proccessUpdate;

  export const selectAboutNavTarget = ({ aboutPage }) =>
  aboutPage.dom.navTarget;
