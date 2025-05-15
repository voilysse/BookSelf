import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const url = "http://localhost:4000";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      await axios.post(
        `${url}/api/register`,
        { username, email, password },
        config
      );
    } catch (error) {
      const errMsg = error?.response?.data?.msg || "Registration failed.";
      toast.error(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${url}/api/login`,
        { email, password },
        config
      );
      return data;
    } catch (error) {
      const errMsg = error?.response?.data?.msg || "Login failed.";
      toast.error(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);
