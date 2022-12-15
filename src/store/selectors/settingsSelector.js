export const selectSettingsStatus = ({ settings }) => ({
  target: settings.target,
  editableTarget: settings.editableTarget,
  isEditing: settings.isEditing,
});
