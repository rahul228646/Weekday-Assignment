import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFiltering, selectJobFilters } from "../../slices/JobsDataSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const jobFilter = useSelector((state) => selectJobFilters(state));
  const remoteOptions = [
    { filterName: "Remote", filterValue: "remote" },
    { filterName: "Remote", filterValue: "In-office" },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <TextField
        placeholder="Search Role"
        name="jobRole"
        variant="outlined"
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
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue: Number(e.target.value),
            })
          )
        }
      />
      <TextField
        type="number"
        placeholder="Experience"
        name="minExp"
        variant="outlined"
        onChange={(e) =>
          dispatch(
            handleFiltering({
              filterName: e.target.name,
              filterValue: Number(e.target.value),
            })
          )
        }
      />
      {/* <Autocomplete
        multiple
        options={remoteOptions}
        disableCloseOnSelect
        isOptionEqualToValue={(option, value) =>
          option?.filterName === value?.filterName
        }
        getOptionLabel={(option) => option?.filterName}
        renderTags={() => null}
        onChange={(e, newValue) => console.log(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Select Countries"
          />
        )}
      /> */}
    </div>
  );
};

export default Filters;
