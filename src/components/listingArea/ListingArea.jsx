import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  selectJobDataLoading,
  selectJobsData,
} from "../../slices/JobsDataSlice";
import JobCard from "../jobCard/JobCard";
import "./listingArea.css";
import { CircularProgress, Grid } from "@mui/material";

const ListingArea = () => {
  const dispatch = useDispatch();
  const jobsDataLoading = useSelector((state) => selectJobDataLoading(state));
  const jobsData = useSelector((state) => selectJobsData(state));
  const [offset, setOffset] = useState(0);
  let limit = 12;

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 20 >
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + limit);
    }
  };

  useEffect(() => {
    dispatch(getJobs({ limit, offset }));
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <div className="listing-area-root">
      <Grid container spacing={4} className="listing-area-card-content">
        {jobsData?.map((job) => (
          <JobCard key={job?.jdUid} data={job} />
        ))}
      </Grid>
      {jobsDataLoading && (
        <div className="listing-area-laoding">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ListingArea;
