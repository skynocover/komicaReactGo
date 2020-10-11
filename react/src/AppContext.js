import React, { useState, useEffect } from "react";
import "./mainstyle.css";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import Reportform from "./components/reportform.js";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [thread, setThread] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [reportDraw, setReportDraw] = React.useState(false);
  const toggleReport = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setReportDraw(open);
  };

  const [replyDraw, setReplyDraw] = React.useState(false);
  const toggleReply = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    replyDraw(open);
  };

  const getthread = async (page) => {
    axios
      .get("/thread/get?page=" + page)
      .then((res) => {
        // console.table(res.data.Threads)
        console.log(res.data.Threads);
        setThread(res.data.Threads);
        setPageCount(Math.ceil(res.data.Count / 10));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

  const Report = (reason, content) => {
    axios
      .post("/report/post", {
        reason,
        content,
      })
      .then((res) => {
        console.table(res.data);
        if (res.data.errorCode === 0) {
          setSuccess(true);
          setSuccessLabel("回報成功");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
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
        setSuccess(true);
        if (parent) {
          setSuccessLabel("回覆成功");
        } else {
          setSuccessLabel("發文成功");
        }
        getthread(1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

  const [success, setSuccess] = React.useState(false);
  const [successLabel, setSuccessLabel] = React.useState("success");
  const SuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
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
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <AppContext.Provider
      value={{
        getthread,
        thread,
        pageCount,
        toggleReport,
        setReportDraw,
        toggleReply,
        setReplyDraw,
        Report,
        Post,
      }}
    >
      {children}
      <Drawer anchor="bottom" open={reportDraw} onClose={toggleReport(false)}>
        <div className="m-3">
          <Reportform />
        </div>
      </Drawer>
      <div className={classes.root}>
        <Snackbar open={success} autoHideDuration={1000} onClose={SuccessClose}>
          <Alert onClose={SuccessClose} severity="success">
            {successLabel}
          </Alert>
        </Snackbar>
      </div>
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
