import React, { useState } from "react";
import "./mainstyle.css";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Postform from "./components/postform.js";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [SingleThread, setSingleThread] = React.useState(false);

  // draw ...
  const [drawOpen, setDrawOpen] = React.useState(false);
  const [Form, setForm] = React.useState(<Postform />);
  const toggle = (open, form) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawOpen(open);
    form && setForm(form);
  };

  // success drawer
  const [success, setSuccess] = React.useState(false);
  const [successLabel, setSuccessLabel] = React.useState("success");
  const [severity, setSeverity] = React.useState("success");
  const SuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  // api ...
  const Report = (reportid, reason, content) => {
    axios
      .post("/report/post", {
        reason,
        content,
        reportid,
      })
      .then((res) => {
        console.table(res.data);
        if (res.data.errorCode === 0) {
          setSuccess(true);
          setSuccessLabel("回報成功");
        } else {
          setSeverity("error");
          setSuccessLabel(res.data.errorMessage);
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const Post = (title, image, content, name, withImage, sage, parent) => {
    axios
      .post("/thread/post", {
        title,
        image,
        content,
        name,
        withImage,
        sage,
        parent,
      })
      .then((res) => {
        console.table(res.data);
        if (res.data.errorCode === 0) {
          if (parent) {
            setSuccessLabel("回覆成功");
          } else {
            setSuccessLabel("發文成功");
          }
          setSeverity("success");
          setSuccess(true);
          if (!sage) {
            getthread(1);
          } else {
            getthread(page);
          }
        } else {
          setSeverity("error");
          setSuccessLabel(res.data.errorMessage);
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  // get thread and page account ...
  const [thread, setThread] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const getthread = async () => {
    let url = window.location.hash;
    if (!url.startsWith("#/?page")) {
      setSingleThread(true);
    } else {
      setPage(Number(url.slice(8)));
      setSingleThread(false);
    }
    axios
      .get("/thread/get" + url.slice(2))
      .then((res) => {
        if (res.data.errorCode === 0) {
          // console.table(res.data)
          // console.log(res.data.Threads);
          setThread(res.data.Threads);
          setPageCount(Math.ceil(res.data.Count / 10));
          // setPage(page);
        } else {
          setSeverity("error");
          setSuccessLabel(res.data.errorMessage);
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  return (
    <AppContext.Provider
      value={{
        thread,
        getthread,

        Report,
        Post,
        toggle,
        setDrawOpen,

        SingleThread,
        pageCount,
        page,
        setPage,
      }}
    >
      {children}

      <div className={classes.root}>
        <Snackbar open={success} autoHideDuration={1200} onClose={SuccessClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={SuccessClose}
            severity={severity}
          >
            {successLabel}
          </MuiAlert>
        </Snackbar>
      </div>

      <Drawer anchor="bottom" open={drawOpen} onClose={toggle(false)}>
        <div className="m-3">{Form}</div>
      </Drawer>
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
