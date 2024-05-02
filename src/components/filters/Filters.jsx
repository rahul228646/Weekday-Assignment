import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFiltering, selectJobFilters } from "../../slices/JobsDataSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const jobFilters = useSelector((state) => selectJobFilters(state));
  const remoteOptions = ["remote", "in-office"];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <TextField
        placeholder="Search Role"
        name="jobRole"
        variant="outlined"
        value={"jobRole" in jobFilters ? jobFilters["jobRole"] : ""}
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue: e.target.value,
            })
          )
        }
      />

      <TextField
        placeholder="Search Location"
        name="location"
        variant="outlined"
        value={"location" in jobFilters ? jobFilters["location"] : ""}
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue: e.target.value,
            })
          )
        }
      />
      <TextField
        type="number"
        placeholder="Min Base Pay Salary"
        name="minJdSalary"
        variant="outlined"
        value={"minJdSalary" in jobFilters ? jobFilters["minJdSalary"] : null}
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue:
                e.target.value === "" ? null : Number(e.target.value),
            })
          )
        }
      />
      <TextField
        type="number"
        placeholder="Experience"
        name="minExp"
        variant="outlined"
        value={"minExp" in jobFilters ? jobFilters["minExp"] : null}
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue:
                e.target.value === null ? "" : Number(e.target.value),
            })
          )
        }
      />
      <Autocomplete
        sx={{ minWidth: "200px" }}
        multiple
        id="tags-standard"
        options={remoteOptions}
        value={"remote" in jobFilters ? jobFilters["remote"] : []}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} placeholder="remote" />}
        onChange={(e, newValue) => {
          dispatch(
            handleFiltering({
              filterName: "remote",
              filterValue: newValue,
            })
          );
        }}
      />
    </div>
  );
};

export default Filters;
