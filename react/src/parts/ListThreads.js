import React, { useContext } from "react";
import "../mainstyle.css";

import Image from "../components/image.js";
import ThreadLabel from "../components/threadLabel.js";
import Divider from "@material-ui/core/Divider";
import { AppContext } from "../AppContext";

const ReactMarkdown = require("react-markdown");
const Reply = ({ reply }) => {
  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={reply} />
      </div>
      <div className="row p-2 justify-content-center">
        {reply.image && (
          <div className="col-sm-4 p-2 ">
            <Image image={reply.image} ID={reply.id} />
          </div>
        )}

        <div className="col-sm-5 col-no-gutters p-2 ">
          <ReactMarkdown source={reply.content} />
        </div>
      </div>
    </>
  );
};

const Thread = ({ thread }) => {
  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={thread} />
      </div>
      <div className="row p-2 justify-content-center ">
        {thread.image && (
          <div className="col-sm-4 p-2 ">
            <Image image={thread.image} imageID={thread.imageID} />
          </div>
        )}

        <div className="col-sm-5 p-2">
          <ReactMarkdown source={thread.content} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="container">
          {thread.reply != null &&
            thread.reply.map((item) => <Reply key={item.id} reply={item} />)}
        </div>
      </div>

      <Divider className="m-3 row" />
    </>
  );
};

const ListThreads = () => {
  const appCtx = useContext(AppContext);
  return (
    <div className="container">
      {appCtx.thread.map((item) => (
        <Thread key={item.id} thread={item} />
      ))}
    </div>
  );
};

export default ListThreads;
