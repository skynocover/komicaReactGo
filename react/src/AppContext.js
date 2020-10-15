import React, { useState } from "react";
import "./mainstyle.css";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CryptoJS from "crypto-js";

import Postform from "./components/postform.js";

const AppContext = React.createContext();

const _secret = "0123456789abcdef0123456789abcdef";
  const EncryptJson = (data) => {
    const key = CryptoJS.enc.Utf8.parse(_secret);
    const iv = GetRandomString(16);

    let srcs = "0000000000000000" + JSON.stringify(data);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding,
    });

    return encrypted.ciphertext.toString();
  };

  const DecryptJson = (data) => {
    const key = CryptoJS.enc.Utf8.parse(_secret);

    let decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(data.slice(32)) },
      key,
      {
        iv: CryptoJS.enc.Hex.parse(data.slice(0, 32)),
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
      }
    );

    let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedStr);
  };

  const GetRandomString = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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
    open && setForm(form);
    setDrawOpen(open);
  };

  // success drawer
  const [success, setSuccess] = React.useState(false);
  const [successLabel, setSuccessLabel] = React.useState("success");
  const [severity, setSeverity] = React.useState("success");
  const SuccessClose = (_event, reason) => {
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
        // console.table(res.data);
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
    let enc = EncryptJson({
      title,
      image,
      content,
      name,
      withImage,
      sage,
      parent,
    })
    axios
      .post("/thread/post",enc)
      .then((res) => {
        // console.table(res.data);
        if (res.data.errorCode === 0) {
          if (parent) {
            setSuccessLabel("回覆成功");
          } else {
            setSuccessLabel("發文成功");
          }
          setSeverity("success");
          setSuccess(true);
          getthread();
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
    if (url === "") {
      url = "#/?page=1";
    }
    let pages = url.match(/page=[0-9]+/);
    let id = url.match(/id=[0-9]+/)
    if (pages) {
      setPage(Number(pages[0].slice(5)));
      setSingleThread(false);
    } else if(id){
      setSingleThread(true);
    }else{
      return
    }
    axios
      .get("/thread/get" + url.slice(2))
      .then((res) => {
        if (res.data.errorCode === 0) {
          // console.table(res.data);
          // console.log(res.data.Threads);
          setThread(res.data.Threads);
          setPageCount(Math.ceil(res.data.Count / 10));
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
