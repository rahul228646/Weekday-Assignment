import React from "react";
import "./jobCard.css";
import { Button, Grid, Typography } from "@mui/material";
import JobDescriptionModal from "./JobDescriptionModal";
import { numberToCurrency } from "../../utils";

const JobCard = ({ data, reference }) => {
  const {
    jobRole,
    location,
    maxJdSalary,
    minJdSalary,
    jobDetailsFromCompany,
    maxExp,
    minExp,
    jdLink,
    salaryCurrencyCode,
    jdUid,
  } = data;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} ref={reference}>
      <div className="job-card-root">
        <div className="job-card-content">
          <div className="job-card-header">
            {jobRole && (
              <Typography fontSize={14} fontWeight={400}>
                {jobRole}
              </Typography>
            )}
            {location && (
              <Typography fontSize={11} fontWeight={500}>
                {location}
              </Typography>
            )}
          </div>
          <div className="job-card-subheading">
            <Typography fontSize={13} fontWeight={400} color={"#4d596a"}>
              {minJdSalary && maxJdSalary
                ? `Estimated Salary : ${numberToCurrency(
                    minJdSalary,
                    salaryCurrencyCode
                  )}(min) ${salaryCurrencyCode} - ${numberToCurrency(
                    maxJdSalary,
                    salaryCurrencyCode
                  )} ${salaryCurrencyCode} (max)`
                : minJdSalary || maxJdSalary
                ? `Estimated Salary  : ${numberToCurrency(
                    minJdSalary || maxJdSalary,
                    salaryCurrencyCode
                  )} ${salaryCurrencyCode} ${minJdSalary ? "(min)" : "(max)"}`
                : "Estimated Salary  : Not Mentioned"}
            </Typography>
          </div>
          {jobDetailsFromCompany && (
            <div className="job-card-desc">
              <Typography fontSize={15} fontWeight={500}>
                Job Description :
              </Typography>
              <Typography fontSize={14}>{jobDetailsFromCompany}</Typography>
            </div>
          )}
        </div>
        {jobDetailsFromCompany && (
          <div className="job-card-show-btn-container">
            <JobDescriptionModal JobDescription={jobDetailsFromCompany} />
          </div>
        )}

        <div className="job-card-footer">
          <Typography fontSize={11} color={"#8b8b8b"}>
            {minExp && maxExp
              ? `Experience : ${minExp} years (min) - ${maxExp} years (max)`
              : minExp || maxExp
              ? `Experience : ${minExp || maxExp} years ${
                  minExp ? "(min)" : "(max)"
                }`
              : "Experience : Not Mentioned"}
          </Typography>
          {jdLink && (
            <Button
              className="job-card-apply-btn"
              variant={"contained"}
              disableRipple
              fullWidth
              onClick={() => window.open(jdLink, "_blank")}
              disableElevation
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </Grid>
  );
};

export default JobCard;
