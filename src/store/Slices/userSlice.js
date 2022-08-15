import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("https://geolocation-db.com/json/");
  const data = response.data;
  const result = {
    id: data["IPv4"].replaceAll(".", ""),
    ip: data["IPv4"],
    country: data["country_name"],
    lat: data["latitude"],
    lng: data["longitude"],
  };
  return result;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
