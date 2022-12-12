export function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}
