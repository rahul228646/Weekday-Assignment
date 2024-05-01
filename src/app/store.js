import { configureStore } from "@reduxjs/toolkit";
import JobsDataSlice from "../slices/JobsDataSlice";

export default configureStore({
  reducer: {
    jobsData: JobsDataSlice,
  },
});
