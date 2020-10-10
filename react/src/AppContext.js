import React, { useState, useEffect } from "react";
import "./mainstyle.css";
import axios from "axios";

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
        if (res.data.errorCode == 0) {
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

  const [success, setSuccess] = React.useState(false);
  const [successLabel, setSuccessLabel] = React.useState("success");
  const SuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  return (
    <AppContext.Provider
      value={{
        success,
        SuccessClose,
        getthread,
        reportDraw,
        thread,
        pageCount,
        toggleReport,
        setReportDraw,
        toggleReply,
        setReplyDraw,
        Report,
        successLabel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
