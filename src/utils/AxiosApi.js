import axios from "axios";

export const postApiRequest = async (url, body, rejectWithValue, token) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response["data"] || { error: "unknown Error" };
    console.log(errorData);
    return rejectWithValue(errorData);
  }
};

export const getApiRequest = async (url, rejectWithValue, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response["data"] || { error: "unknown Error" };
    console.log(errorData);
    return rejectWithValue(errorData);
  }
};

export const putApiRequest = async (url, rejectWithValue, token) => {
  try {
    const response = await axios.put(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response["data"] || { error: "unknown Error" };
    console.log(errorData);
    return rejectWithValue(errorData);
  }
};

export const deleteApiRequest = async (url, rejectWithValue, token) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    const errorData = error.response["data"] || { error: "unknown Error" };
    console.log(errorData);
    return rejectWithValue(errorData);
  }
};
