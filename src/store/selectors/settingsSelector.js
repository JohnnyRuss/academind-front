export const selectSettingsStatus = ({ settings }) => ({
  target: settings.target,
  editableTarget: settings.editableTarget,
  isEditing: settings.isEditing,
  headingTitle: settings.headingTitle,
});

export const selectBirthDate = ({ settings }) => settings.updateables.birthDate;

export const selectBirthPlace = ({ settings }) =>
  settings.updateables.birthPlace;

export const selectLivingPlace = ({ settings }) =>
  settings.updateables.livingPlace;

export const selectEducation = ({ settings }) => settings.updateables.education;

export const selectWorkplace = ({ settings }) => settings.updateables.workplace;
