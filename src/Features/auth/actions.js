import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApiRequest } from "../../utils/AxiosApi";

export const signUpUser = createAsyncThunk(
  "Auth/SignUp",
  async (user, { rejectWithValue }) => {
    return await postApiRequest("/api/signup", { ...user }, rejectWithValue);
  }
);

export const loginUser = createAsyncThunk(
  "Auth/LogIn",
  async (user, { rejectWithValue }) => {
    return await postApiRequest("/api/signin", user, rejectWithValue);
  }
);
