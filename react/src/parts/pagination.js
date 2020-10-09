import React from "react";
import "../mainstyle.css";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Pages = () => {
  const classes = useStyles();
  return (
    <div className="d-flex flex-column bd-highlight row ml-2">
      <Pagination count={10} shape="rounded" />
    </div>
  );
};

export default Pages;
