import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobs = createAsyncThunk(
  "jobsData/getJobsData",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          limit: limit,
          offset: offset,
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
      .addCase(getJobs.pending, (state, action) => {
        state.jobsDataLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobsDataLoading = false;
        state.jobsData = action.payload?.jdList;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.jobsDataLoading = false;
        state.jobsDataError = action.payload;
      });
  },
});
export const selectJobsData = (state) => state.jobsData.jobsData;
export const selectJobDataLoading = (state) => state.jobsData.jobsDataLoading;
export default jobsDataSlice.reducer;
