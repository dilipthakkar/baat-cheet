import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import AuthReducer from "./auth/authSlice";
import ConversationReducer from "./conversations/conversationSlice";
import CommonReducer from "./Common/CommonSlice";

const persistConfig = {
  key: "chat-root",
  storage,
  blacklist: ["auth", "conversation", "common"],
  // blacklist : ["auth.loading" , "auth.error" , "auth.message"]
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["loading", "error", "message"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  conversation: ConversationReducer,
  common: CommonReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
