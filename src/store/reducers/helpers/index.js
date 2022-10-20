export function updateLoadingState({ state, key, loading, message = '', error = false }) {
  state[key].loading = loading;
  state[key].message = message;
  state[key].error = error;
}
