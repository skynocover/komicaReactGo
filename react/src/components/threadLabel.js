import React from "react";
import "../mainstyle.css";

import Postform from "../parts/postform.js";
import Reportform from "./reportform.js";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import Drawer from "@material-ui/core/Drawer";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const ReplyBtm = ({ parent, initialized }) => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <IconButton aria-label="delete" size="small" onClick={toggleDrawer(true)}>
        <ReplyRoundedIcon />
      </IconButton>

      <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
        <div className="m-3">
          <Postform
            type={"reply"}
            parent={parent}
            drawOpen={setState}
            initialized={initialized}
          />
        </div>
      </Drawer>
    </>
  );
};

const ReportBtm = ({ handleClick }) => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <>
      <IconButton size="small" onClick={toggleDrawer(true)}>
        <ReportIcon />
      </IconButton>

      <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
        <div className="m-3">
          <Reportform drawOpen={setState} handleClick={handleClick} />
        </div>
      </Drawer>
    </>
  );
};

export default function ThreadLabel({ post, initialized }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    <>
      {post.title && <span className="text-danger">{post.title}</span>}
      <span className="text-primary">{post.name}</span>
      {/* <span className="text-secondary">[{dayjs.unix(post.time).format("YYYY-MM-DD HH:mm:ss")}]</span> */}
      <span className="text-secondary">[{post.time} ID:{post.poster_id}]</span>
      <span className="text-info">No:{post.id}</span>
      <ReportBtm handleClick={()=>{setOpen(true)}} />
      {post.title && <ReplyBtm parent={post.id} initialized={initialized} />}
     
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            回報成功
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
