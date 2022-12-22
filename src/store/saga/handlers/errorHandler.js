import { put } from "redux-saga/effects";

export function* showError({ error, location, setter, setterParams }) {
  if (setter)
    yield put(
      setter({
        msg: error?.response?.data?.message || undefined,
        ...setterParams,
      })
    );

  if (process.env.REACT_APP_ENV_MODE !== "DEV") return;

  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

export function triggerError() {
  throw new Error("manually trigered error");
}
