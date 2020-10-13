import React, { useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./mainstyle.css";

import { Divider } from "@material-ui/core";
import { AppContext } from "./AppContext";

import TopLink from "./parts/topLink.js";
import Header from "./parts/header";
import Poster from "./parts/poster";
import Pagenation from "./parts/pagination.js";
import ListThreads from "./parts/listThreads.js";
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
      <Poster />
      <Pagenation />
      <Divider />
      <ListThreads />
      <Pagenation />
      <BottomLink />
    </>
  );
};

export default Main;
