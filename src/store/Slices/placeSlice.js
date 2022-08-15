import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, set, push, get } from "firebase/database";
import { db } from "../../firebase";

const initialState = {
  value: null,
  searchHistory: [],
  selectedLoc: null,
};


export const setUserPlace = createAsyncThunk(
  "user/setUserPlace",
  (place, thunkAPI) => {
    const userId = thunkAPI.getState().user.user.id;
    const logRef = push(ref(db, 'logs/' + userId));
    set(logRef, place);
    return place;
});

export const getUserPlaces = createAsyncThunk(
  "user/getUserPlaces",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().user.user.id;
    const userPlacesRef = ref(db, 'logs/' + userId);
    const snapshot = await get(userPlacesRef);
    const result = Object.values(snapshot.val()).reverse();
    const uniquePlaces = result.filter((item, pos, arr) => (
      arr.findIndex((a) => a.value === item.value) === pos
    ));
    return uniquePlaces; 
});

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    latestSearch: (state, action) => {
      state.value = action.payload;
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter((h) => h.value !== action.payload.value),
      ];
      state.selectedLoc = action.payload;
    },
    selectLocation: (state, action) => {
      state.selectedLoc = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUserPlace.fulfilled, (state, action) => {
      state.value = action.payload;
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter((h) => h.value !== action.payload.value),
      ];
      state.selectedLoc = action.payload;
    });
    builder.addCase(getUserPlaces.fulfilled, (state, action) => {
      state.searchHistory = action.payload || [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { latestSearch, selectLocation } = placeSlice.actions;

export default placeSlice.reducer;
