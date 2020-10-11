import React, { useState } from "react";
import "./mainstyle.css";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import Reportform from "./components/reportform.js";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Postform from "./parts/postform.js";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // report ...
  const [reportID, setReportID] = React.useState(null);
  const [reportDraw, setReportDraw] = React.useState(false);
  const toggleReport = (open, reportID) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setReportID(reportID);
    setReportDraw(open);
  };

  const Report = (reason, content) => {
    axios
      .post("/report/post", {
        reason,
        content,
        reportid: reportID,
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

  // reply ...
  const [replyParent, setReplyParent] = React.useState(null);
  const [replyDraw, setReplyDraw] = React.useState(false);
  const toggleReply = (open, parent) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setReplyDraw(open);
    if (open) {
      setReplyParent(parent);
    }
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
            setSeverity("success");
            setSuccessLabel("回覆成功");
            setSuccess(true);
          } else {
            setSuccessLabel("發文成功");
            setSuccess(true);
          }
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
  const getthread = async (page) => {
    axios
      .get("/thread/get?page=" + page)
      .then((res) => {
        // console.table(res.data.Threads)
        console.log(res.data.Threads);
        setThread(res.data.Threads);
        setPageCount(Math.ceil(res.data.Count / 10));
        setPage(page);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
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
        setReplyParent,
        setReplyDraw,
        Report,
        Post,
        page,
      }}
    >
      {children}
      <Drawer anchor="bottom" open={reportDraw} onClose={toggleReport(false)}>
        <div className="m-3">
          <Reportform />
        </div>
      </Drawer>
      <div className={classes.root}>
        <Snackbar open={success} autoHideDuration={1200} onClose={SuccessClose}>
          <Alert onClose={SuccessClose} severity={severity}>
            {successLabel}
          </Alert>
        </Snackbar>
      </div>

      <Drawer anchor="bottom" open={replyDraw} onClose={toggleReply(false)}>
        <div className="m-3">
          <Postform parent={replyParent} />
        </div>
      </Drawer>
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
