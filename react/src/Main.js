import React, { useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./mainstyle.css";

import { Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import ListThreads from "./parts/ListThreads.js";
import Header from "./parts/header";
import Postform from "./parts/postform.js";
import WarningSign from "./parts/warningSign.js";
import TopLink from "./parts/topLink.js";
import BottomLink from "./parts/bottomLink.js";
import { AppContext } from "./AppContext";

// import { Pagination } from 'antd';

const Main = () => {
  const appCtx = useContext(AppContext);

  const handlePage = async (event, value) => {
    await appCtx.getthread(value);
  };

  useEffect(() => {
    appCtx.getthread(1);
  }, []); //[0]動作[1]會觸發動作的事件

  return (
    <div className="Main">
      <TopLink />
      <Header />
      <div className=" container">
        <Postform type={"post"} />
        <WarningSign />
      </div>
      <div className=" d-flex justify-content-center m-2">
        <Pagination
          count={appCtx.pageCount}
          shape="rounded"
          color="primary"
          page={appCtx.page}
          onChange={handlePage}
        />
      </div>
      <Divider />
      <ListThreads threads={appCtx.thread} />
      <div className=" d-flex justify-content-center m-2">
        <Pagination
          count={appCtx.pageCount}
          shape="rounded"
          color="primary"
          page={appCtx.page}
          onChange={handlePage}
        />
      </div>
      <BottomLink />
    </div>
  );
};

export default Main;
