import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser } from "../auth/actions";
import {
  getAllConversation,
  getConversationById,
  sendMessage,
  sendMessageNew,
} from "../conversations/actions";
const initialState = {
  message: "",
  error: "",
};
const CommonReducer = createSlice({
  name: "Common",
  initialState: initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload || "unknown Error";
    },
    emptyError: (state) => {
      state.error = "";
    },
    setMessage: (state, { payload }) => {
      state.message = payload || "unknown Error";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: {
    [signUpUser.fulfilled]: (state, { payload }) => {
      Object.assign(state, initialState);
      state.message = "User added Successfully";
    },
    [signUpUser.rejected]: (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload.error || "network Error";
    },
    [loginUser.rejected]: (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload.error || "network Error";
    },
    [getAllConversation.rejected]: (state, { payload }) => {
      Object.assign(state, initialState);
      state.error = payload?.error || "newwork Error";
    },
    [getConversationById.rejected]: (state, { payload }) => {
      Object.assign(state, initialState);
      state.error = "error in network";
    },
    [sendMessage.rejected]: (state, { payload, meta }) => {
      Object.assign(state, initialState);
      state.error = "try again";
    },
    [sendMessageNew.rejected]: (state, { payload, meta }) => {
      Object.assign(state, initialState);
      state.error = payload.error || "network Error";
    },
  },
});
export const { setError, setMessage, emptyError, emptyMessage } =
  CommonReducer.actions;
export default CommonReducer.reducer;
