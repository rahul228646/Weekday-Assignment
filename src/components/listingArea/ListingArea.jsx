import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  selectJobDataLoading,
  selectJobFilters,
  selectJobsData,
} from "../../slices/JobsDataSlice";
import JobCard from "../jobCard/JobCard";
import "./listingArea.css";
import { CircularProgress, Grid } from "@mui/material";
import Filters from "../filters/Filters";
import { filterJobs } from "../../utils";

const ListingArea = () => {
  const dispatch = useDispatch();
  const jobsDataLoading = useSelector((state) => selectJobDataLoading(state));
  const jobsData = useSelector((state) => selectJobsData(state));
  const jobFilters = useSelector((state) => selectJobFilters(state));
  const [filteredJobs, setFilteredJobs] = useState();
  const [offset, setOffset] = useState(0);
  let limit = 12;

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 40 >
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + limit);
    }
  };


  useEffect(() => {
    setFilteredJobs(filterJobs(jobsData, jobFilters));
  }, [jobsData, jobFilters]);

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
      <Filters />
      <Grid container spacing={4} className="listing-area-card-content">
        {filteredJobs?.map((job) => (
          <JobCard key={job?.jdUid} data={job} />
        ))}
        {jobsDataLoading && (
          <div className="listing-area-laoding">
            <CircularProgress />
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ListingArea;
