import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  user: null,
};

export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  const res = await axios.post(`${config.baseURL}/register`, body);
  let user = res.data.user;
  document.cookie += "jwt=" + res.data.token;
  return user;
});
export const signInUser = createAsyncThunk("signinuser", async (body) => {
  const res = await axios.post(`${config.baseURL}/login`, body);
  let user = res.data.user;
  document.cookie = "jwt=" + res.data.token;
  return user;
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
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
export const { addToken, setUser } = authSlice.actions;
export default authSlice.reducer;
