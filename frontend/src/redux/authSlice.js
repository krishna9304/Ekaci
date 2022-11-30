import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};

export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  const res = await axios.post(`${config.baseURL}/register`, body);
  console.log(res.data);
  let user = res.data.user;
  return user;
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
      }
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default authSlice.reducer;
