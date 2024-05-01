import { Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import "./jobCard.css";

const JobDescriptionModal = ({ JobDescription }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="job-card-show-btn"
        disableRipple
        onClick={() => setOpen(true)}
        disableElevation
      >
        Show More
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="jd-modal-root">
          <div className="jd-header">
            <Typography fontWeight={600} fontSize={"1.25rem"}>
              Job Description
            </Typography>
          </div>
          <div className="jd-content">
            {" "}
            <Typography fontSize={14} color={"#0D0D0D"}>
              {JobDescription}
            </Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDescriptionModal;
