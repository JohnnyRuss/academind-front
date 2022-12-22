export function updateLoadingState({
  state,
  key,
  loading,
  message = "Occured error. Please try again later.",
  error = false,
  target,
}) {
  if (target) state[key].target = target;
  state[key].loading = loading;
  state[key].message = message;
  state[key].error = error;
}

export function resetLoadingState({
  state,
  key,
  loading = false,
  hasTargetField,
}) {
  if (hasTargetField) state[key].target = "";
  state[key].loading = loading;
  state[key].error = false;
  state[key].message = "";
}
