import { createSlice } from "@reduxjs/toolkit";
import {
  getAllConversation,
  getConversationById,
  sendMessage,
} from "./actions";

const initialState = {
  list: [],
  loading: false,
  conversation: {},
};
const conversationReducer = createSlice({
  name: "Conversation",
  initialState: initialState,
  reducers: {
    addMsg: (state, { payload }) => {
      if (
        state.conversation &&
        state.conversation?.messages &&
        payload.sender &&
        (payload.sender === state.conversation.otherPerson._id ||
          payload.sender === payload.userId)
      )
        state.conversation?.messages?.push({
          _id: payload.genId,
          body: payload.msgBody || payload.body,
          status: payload.status || "pending",
          sender: payload.sender,
          timestamp: payload.timestamp?.toString() || new Date().toString(),
        });
    },
    myMsgSeen: (state, { payload }) => {
      state.conversation?.messages?.forEach((message) => {
        if (message.sender == payload.id) message.status = "seen";
      });
    },
    updateConversation: (state, { payload }) => {
      const msg = payload.msg;
      if (msg) {
        const targetConversation = state.list?.find(
          (conv) => conv.otherPerson._id == payload.msg.sender
        );
        if (targetConversation) {
          targetConversation.messages.push(msg);
        }
      }
    },
    updateConversationSeen: (state, { payload }) => {
      const targetConversation = state.list?.find(
        (conv) => conv.otherPerson._id == payload.id
      );
      if (targetConversation) {
        targetConversation.messages?.forEach((message) => {
          if (message.sender != payload.userId) message.status = "seen";
        });
      }
    },
    emptyConversation: (state) => {
      state.conversation = {};
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    resetConversation: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    // get all conversations
    [getAllConversation.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAllConversation.fulfilled]: (state, { payload }) => {
      state.list = payload.conversations;
      state.loading = false;
    },
    [getAllConversation.rejected]: (state, { payload }) => {
      state.list = [];
      state.loading = false;
    },
    // get conversation By Id

    [getConversationById.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getConversationById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.conversation = payload.conversation;
    },

    [getConversationById.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // send a message to existing conversation
    [sendMessage.pending]: (state, { payload, meta }) => {},
    [sendMessage.fulfilled]: (state, { payload, meta }) => {
      state.conversation.messages.forEach((msg) => {
        if (msg.status === "pending") {
          msg.status = "delivered";
        }
      });
    },
    [sendMessage.rejected]: (state, { payload, meta }) => {
      const genId = meta.arg.genId;
      if (state.conversation) {
        state.conversation.messages = state.conversation?.messages?.filter(
          (msg) => msg._id != genId
        );
      }
    },
  },
});
export const {
  addMsg,
  myMsgSeen,
  updateConversation,
  updateConversationSeen,
  emptyConversation,
  setLoading,
  resetConversation,
} = conversationReducer.actions;
export default conversationReducer.reducer;
