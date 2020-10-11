import React, { useContext } from "react";
import "../mainstyle.css";

import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";

import { AppContext } from "../AppContext";

export default function ThreadLabel({ post }) {
  const appCtx = useContext(AppContext);

  return (
    <>
      {post.title && <span className="text-danger">{post.title}</span>}
      <span className="text-primary">{post.name}</span>
      <span className="text-secondary">
        [{post.time} ID:{post.poster_id}]
      </span>
      <span className="text-info">No:{post.id}</span>
      <IconButton size="small" onClick={appCtx.toggleReport(true,post.id)}>
        <ReportIcon />
      </IconButton>
      {post.title && (
        <IconButton aria-label="delete" size="small" onClick={appCtx.toggleReply(true,post.id)}>
          <ReplyRoundedIcon />
        </IconButton>
      )}
    </>
  );
}
