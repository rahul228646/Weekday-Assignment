import React from "react";
import "./jobCard.css";
import { Button, Typography } from "@mui/material";
import JobDescriptionModal from "./JobDescriptionModal";

const data = {
  jdUid: "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
  jdLink: "https://weekday.works",
  jobDetailsFromCompany:
    "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
  maxJdSalary: null,
  minJdSalary: null,
  salaryCurrencyCode: null,
  location: "delhi ncr",
  minExp: null,
  maxExp: null,
  jobRole: "frontend",
};

const JobCard = () => {
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
  } = data;
  return (
    <div className="job-card-root">
      <div className="job-card-content">
        <div className="job-card-header">
          <Typography fontSize={14} fontWeight={400}>
            {jobRole}
          </Typography>
          <Typography fontSize={11} fontWeight={500}>
            {location}
          </Typography>
        </div>
        <div className="job-card-subheading">
          <Typography
            fontSize={13}
            fontWeight={400}
            color={"#4d596a"}
          >{`Estimated Salary : ${minJdSalary} - ${maxJdSalary}`}</Typography>
        </div>
        <div className="job-card-desc">
          <Typography fontSize={15} fontWeight={500}>
            Job Description :
          </Typography>
          <Typography fontSize={14}>{jobDetailsFromCompany}</Typography>
        </div>
      </div>
      <div className="job-card-show-btn-container">
        <JobDescriptionModal JobDescription={jobDetailsFromCompany}/>
      </div>

      <div className="job-card-footer">
        <Typography fontSize={11} color={"#8b8b8b"}>
          {`Experience : ${minExp} - ${maxExp}`}
        </Typography>
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
      </div>
    </div>
  );
};

export default JobCard;
