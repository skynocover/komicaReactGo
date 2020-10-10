import React, { useContext } from "react";
import "../mainstyle.css";

import Postform from "../parts/postform.js";
import Reportform from "./reportform.js";

import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import Drawer from "@material-ui/core/Drawer";
import { AppContext } from "../AppContext";

const ReplyBtm = ({ parent }) => {
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
          <Postform type={"reply"} parent={parent} drawOpen={setState} />
        </div>
      </Drawer>
    </>
  );
};

export default function ThreadLabel({ post }) {
  const appCtx = useContext(AppContext);

  return (
    <>
      {post.title && <span className="text-danger">{post.title}</span>}
      <span className="text-primary">{post.name}</span>
      {/* <span className="text-secondary">[{dayjs.unix(post.time).format("YYYY-MM-DD HH:mm:ss")}]</span> */}
      <span className="text-secondary">
        [{post.time} ID:{post.poster_id}]
      </span>
      <span className="text-info">No:{post.id}</span>
      <IconButton size="small" onClick={appCtx.toggleReport(true)}>
        <ReportIcon />
      </IconButton>
      {post.title && <ReplyBtm parent={post.id} />}
    </>
  );
}
