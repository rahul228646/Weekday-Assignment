export const numberToCurrency = (amount, currencyCode) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode || "INR",
  });
  if (!amount) {
    return null;
  }
  return formatter.format(amount).slice(1);
};

const compareSalary = (value, filters, min, max) => {
  if (value[max] === null && value[min] === null) {
    return false;
  } else if (value[min] === null && value[max] !== null) {
    return filters[min] <= value[max];
  } else if (value[min] !== null && value[max] === null) {
    return filters[min] >= value[min];
  } else {
    return filters[min] >= value[min] && filters[min] <= value[max];
  }
};

const compareExp = (value, filters, min, max) => {
  return value[min] != null && value[max] != null
    ? filters[min] >= value[min] && filters[min] <= value[max]
    : value[max] != null && filters[min] <= value[max];
};

const compareRemote = (value, array) => {
  if (array?.includes("remote") && !array.includes("in-office")) {
    return value["location"] === "remote";
  } else if (!array?.includes("remote") && array.includes("in-office")) {
    return value["location"] !== "remote";
  } else {
    return true;
  }
};

export const filterJobs = (data, filters) => {
  return data?.filter((value) => {
    let flag = true;
    for (let filterName in filters) {
      if (filterName === "minJdSalary") {
        flag =
          filters[filterName] === null
            ? flag
            : flag &&
              compareSalary(value, filters, "minJdSalary", "maxJdSalary");
      } else if (filterName === "minExp") {
        flag =
          filters[filterName] === null
            ? flag
            : flag && compareExp(value, filters, "minExp", "maxExp");
      } else if (filterName === "remote") {
        flag = flag && compareRemote(value, filters[filterName]);
      } else {
        flag = flag && value[filterName]?.includes(filters[filterName]);
      }
    }
    return flag;
  });
};
