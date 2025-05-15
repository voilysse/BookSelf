import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:4000";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }) => {
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
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
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
      return error;
    }
  }
);
