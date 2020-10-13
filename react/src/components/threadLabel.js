import React, { useContext } from "react";
import "../mainstyle.css";

import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import Link from "@material-ui/core/Link";

import { AppContext } from "../AppContext";
import Postform from "./postform.js";
import Reportform from "./reportform.js";

export default function ThreadLabel({ post }) {
  const appCtx = useContext(AppContext);

  return (
    <>
      {post.title && <span className="text-danger">{post.title}</span>}
      <span className="text-primary">{post.name}</span>
      <span className="text-secondary">
        [{post.time} ID:{post.poster_id}]
      </span>
      <span className="text-info">
        {post.title ? (
          <Link
            //href={`/#/thread/take?id=${post.id}`}
            onClick={() => {
              window.location.href = `/#/?id=${post.id}`;
              appCtx.getthread();
            }}
          >
            {`NO: ${post.id}`}
          </Link>
        ) : (
          `NO: ${post.id}`
        )}
      </span>
      <IconButton
        size="small"
        onClick={appCtx.toggle(true, <Reportform id={post.id} />)}
      >
        <ReportIcon />
      </IconButton>
      {post.title && (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={appCtx.toggle(true, <Postform parent={post.id} />)}
        >
          <ReplyRoundedIcon />
        </IconButton>
      )}
    </>
  );
}
