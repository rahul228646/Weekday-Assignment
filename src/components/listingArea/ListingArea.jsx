import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  selectJobDataLoading,
  selectJobsData,
} from "../../slices/JobsDataSlice";
import JobCard from "../jobCard/JobCard";
import "./listingArea.css";
import { CircularProgress } from "@mui/material";

const ListingArea = () => {
  const dispatch = useDispatch();
  const jobsDataLoading = useSelector((state) => selectJobDataLoading(state));
  const jobsData = useSelector((state) => selectJobsData(state));
  useEffect(() => {
    let limit = 2;
    let offset = 0;
    dispatch(getJobs({ limit, offset }));
  }, []);
  return (
    <div className="listing-area-root">
      {jobsDataLoading ? (
        <div className="listing-area-laoding"><CircularProgress/></div>
      ) : (
        <div className="listing-area-card-content">
          {jobsData?.map((job) => (
            <JobCard key={job?.jdUid} data={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingArea;
