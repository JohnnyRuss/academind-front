import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { activeUserReducer } from "./activeUserReducer";
import { userReducer } from "./userReducer";
import { postsDataReducer } from "./postsDataReducer";
import { commentsDataReducer } from "./commentsDataReducer";
import { aboutReducer } from "./aboutReducer";
import { createPostReducer } from "./createPostReducer";
import { portalReducer } from "./portalReducer";
import { friendsReducer } from "./friendsReducer";
import { conversationReducer } from "./conversationReducer";
import { badgeReducer } from "./badgeReducer";

const persistedActvieUserConfig = {
  key: "ActiveUser",
  version: 1,
  storage,
  blacklist: [],
};

const persistedActiveUser = persistReducer(
  persistedActvieUserConfig,
  activeUserReducer
);

export const rootReducer = combineReducers({
  activeUser: persistedActiveUser,
  user: userReducer,
  postsData: postsDataReducer,
  commentsData: commentsDataReducer,
  aboutPage: aboutReducer,
  createPost: createPostReducer,
  portal: portalReducer,
  friends: friendsReducer,
  conversation: conversationReducer,
  badges: badgeReducer,
});
