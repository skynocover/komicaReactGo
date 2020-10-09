import React from "react";
import "../mainstyle.css";

import Image from "../components/image.js";
import ThreadLabel from "../components/threadLabel.js";
import Divider from "@material-ui/core/Divider";
const ReactMarkdown = require("react-markdown");
const Reply = ({ reply ,initialized}) => {
  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={reply} initialized={initialized}/>
      </div>
      <div className="row p-2 justify-content-center">
        {reply.image && (
          <div className="col-sm-4 p-2 ">
            <Image image={reply.image} imageID={reply.imageID} />
          </div>
        )}

        <div className="col-sm-5 col-no-gutters p-2 ">
          <ReactMarkdown source={reply.content} />
        </div>
      </div>
    </>
  );
};

const Thread = ({ thread,initialized }) => {
  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={thread} initialized={initialized} />
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
          {thread.reply!=null && thread.reply.map((item) => (
            <Reply key={item.id} reply={item} initialized={initialized}/>
          ))}
        </div>
      </div>

      <Divider className="m-3 row" />
    </>
  );
};

const ListThreads = ({ threads,initialized }) => {
  return (
    <div className="container">
      {threads.map((item) => (
        <Thread key={item.id} thread={item} initialized={initialized} />
      ))}
    </div>
  );
};

export default ListThreads;
