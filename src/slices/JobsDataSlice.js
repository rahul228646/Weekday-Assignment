import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobs = createAsyncThunk(
  "jobsData/getJobsData",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          limit: 10,
          offset,
        },
        {
          "Content-Type": "application/json",
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  jobsData: null,
  jobsDataLoading: false,
  jobsDataError: "",
};

export const jobsDataSlice = createSlice({
  name: "jobsData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getJobs.pending, (state, action) => {})
      .addCase(getJobs.fulfilled, (state, action) => {})
      .addCase(getJobs.rejected, (state, action) => {});
  },
});
export default jobsDataSlice.reducer;
