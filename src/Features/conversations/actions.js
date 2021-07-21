import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiRequest, postApiRequest } from "../../utils/AxiosApi";
export const getAllConversation = createAsyncThunk(
  "Conversation/getAll",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth?.token;
    return await getApiRequest(
      "/api/p2p/allconversation",
      rejectWithValue,
      token
    );
  }
);

export const getConversationById = createAsyncThunk(
  "Conversation/getById",
  async (conversationId, { rejectWithValue, getState }) => {
    const token = getState().auth?.token;
    return await getApiRequest(
      `/api/p2p/getConversationById/${conversationId}`,
      rejectWithValue,
      token
    );
  }
);

export const sendMessage = createAsyncThunk(
  "Conversation/sendMessage",
  async (
    { rcvNumber, msgBody, genId },
    { rejectWithValue, getState, dispatch }
  ) => {
    dispatch({
      type: "Conversation/addMsg",
      payload: {
        sender: getState().auth?.user._id,
        msgBody,
        genId,
        userId: getState().auth?.user._id,
      },
    });

    const token = getState().auth?.token;
    return await postApiRequest(
      `/api/p2p/sendmessage`,
      { rcvNumber, msgBody, genId },
      rejectWithValue,
      token
    );
  }
);

export const sendMessageNew = createAsyncThunk(
  "Conversation/sendMessageNew",
  async (
    { rcvNumber, msgBody, genId },
    { rejectWithValue, getState, dispatch }
  ) => {
    const token = getState().auth?.token;
    return await postApiRequest(
      `/api/p2p/sendmessage/new`,
      { rcvNumber, msgBody, genId },
      rejectWithValue,
      token
    );
  }
);

export const seenMsg = createAsyncThunk(
  "Conversation/seenMessage",
  async ({ phoneNo }, { rejectWithValue, getState }) => {
    const token = getState().auth?.token;
    return await postApiRequest(
      `/api/p2p/msgseen`,
      { phoneNo },
      rejectWithValue,
      token
    );
  }
);
