import { createSelector } from "@reduxjs/toolkit";

export const selectAboutPageState = ({ aboutUser }) => aboutUser.loadingState;

const selectedAboutUserData = ({ aboutUser }) => aboutUser.data;

export const selectAboutUserData = createSelector(
  selectedAboutUserData,
  (memorised) => memorised
);

export const selectAboutUpdateCredentials = ({ aboutUser }) =>
  aboutUser.dom.updateCredentials;

export const selectAboutProccessUpdate = ({ aboutUser }) =>
  aboutUser.dom.proccessUpdate;

export const selectAboutActive = ({ aboutUser }) =>
  aboutUser.dom.proccessUpdate;

export const selectAboutTarget = ({ aboutUser }) =>
  aboutUser.dom.proccessUpdate;

export const selectAboutNavTarget = ({ aboutUser }) => aboutUser.dom.navTarget;
