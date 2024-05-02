import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  selectJobDataLoading,
  selectJobFilters,
  selectJobsData,
  selectTotalCount,
} from "../../slices/JobsDataSlice";
import JobCard from "../jobCard/JobCard";
import "./listingArea.css";
import { CircularProgress, Grid } from "@mui/material";
import Filters from "../filters/Filters";
import { filterJobs } from "../../utils";
import NoData from "../noData/NoData";

const ListingArea = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => selectTotalCount(state));
  const jobsDataLoading = useSelector((state) => selectJobDataLoading(state));
  const jobsData = useSelector((state) => selectJobsData(state));
  const jobFilters = useSelector((state) => selectJobFilters(state));
  const [filteredJobs, setFilteredJobs] = useState();
  const [offset, setOffset] = useState(0);

  let limit = 12;
  const observer = useRef();
  const lastJobRef = useCallback(
    (node) => {
      if (jobsDataLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && offset < totalCount) {
          setOffset((prev) => prev + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [jobsDataLoading]
  );

  useEffect(() => {
    setFilteredJobs(filterJobs(jobsData, jobFilters));
  }, [jobsData, jobFilters]);

  useEffect(() => {
    dispatch(getJobs({ limit, offset }));
  }, [offset]);

  return (
    <div className="listing-area-root">
      <Filters />
      <Grid container spacing={4} className="listing-area-card-content">
        {filteredJobs?.length > 0 ? (
          <>
            {filteredJobs?.map((job, index) => {
              if (index + 1 === filteredJobs?.length) {
                return <JobCard key={job?.jdUid} data={job} />;
              } else {
                return <JobCard key={job?.jdUid} data={job} />;
              }
            })}
            <div ref={lastJobRef}></div>
          </>
        ) : (
          !jobsDataLoading && <NoData />
        )}

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
