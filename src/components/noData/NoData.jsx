import { Typography } from "@mui/material";
import React from "react";

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        marginTop: "100px",
      }}
    >
      <img src={"/src/assets/not-found.png"} />
      <Typography>No Jobs available for this category at the moment</Typography>
    </div>
  );
};

export default NoData;
