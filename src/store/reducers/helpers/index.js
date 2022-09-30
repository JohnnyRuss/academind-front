export function updateLoadingState(state, key, inProcess) {
  state[key].loading = inProcess;
  state[key].error = false;
  state[key].message = '';
}
