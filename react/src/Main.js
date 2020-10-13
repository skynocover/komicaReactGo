import React, { useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./mainstyle.css";

import { Divider } from "@material-ui/core";
import { AppContext } from "./AppContext";

import TopLink from "./parts/topLink.js";
import Header from "./parts/header";
import Postform from "./parts/postform.js";
import WarningSign from "./parts/warningSign.js";
import Pagenation from "./parts/pagination.js";
import ListThreads from "./parts/ListThreads.js";
import BottomLink from "./parts/bottomLink.js";

const Main = () => {
  const appCtx = useContext(AppContext);
  useEffect(() => {
    appCtx.getthread();
  }, []); //[0]動作[1]會觸發動作的事件

  return (
    <>
      <TopLink />
      <Header />
      <Postform />
      <WarningSign />
      <Pagenation />
      <Divider />
      <ListThreads />
      <Pagenation />
      <BottomLink />
    </>
  );
};

export default Main;
