import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";

import "./mainstyle.css";

import ListThreads from "./parts/ListThreads.js";
import Header from "./parts/header";
import Postform from "./parts/postform.js";
import WarningSign from "./parts/warningSign.js";
import TopLink from "./parts/topLink.js";
import BottomLink from "./parts/bottomLink.js";
import { Divider, useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";
import Reportform from "./components/reportform.js";
import Drawer from "@material-ui/core/Drawer";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
// import { Pagination } from 'antd';

const Main = () => {
  const appCtx = useContext(AppContext);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const handlePage = async (event, value) => {
    setPages(value);
    await appCtx.getthread(value);
  };

  useEffect(() => {
    appCtx.getthread(1);
  }, []); //[0]動作[1]會觸發動作的事件
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <div className="Main">
      <TopLink />
      <Header />
      <div className=" container">
        <Postform type={"post"} />
        <WarningSign />
      </div>
      <div className=" d-flex justify-content-center m-2">
        <Pagination
          count={appCtx.pageCount}
          shape="rounded"
          color="primary"
          page={appCtx.page}
          onChange={handlePage}
        />
      </div>
      <Divider />
      <ListThreads threads={appCtx.thread} />
      <div className=" d-flex justify-content-center m-2">
        <Pagination
          count={appCtx.pageCount}
          shape="rounded"
          color="primary"
          page={appCtx.page}
          onChange={handlePage}
        />
      </div>
      <BottomLink />

      <Drawer
        anchor="bottom"
        open={appCtx.reportDraw}
        onClose={appCtx.toggleReport(false)}
      >
        <div className="m-3">
          <Reportform />
        </div>
      </Drawer>
      <div className={classes.root}>
        <Snackbar
          open={appCtx.success}
          autoHideDuration={1000}
          onClose={appCtx.SuccessClose}
        >
          <Alert onClose={appCtx.SuccessClose} severity="success">
            {appCtx.successLabel}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Main;
