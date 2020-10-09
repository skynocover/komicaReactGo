import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "./mainstyle.css";

import ListThreads from "./parts/ListThreads.js";
import Header from "./parts/header";
import Postform from "./parts/postform.js";
import WarningSign from "./parts/warningSign.js";
import TopLink from "./parts/topLink.js";
import BottomLink from "./parts/bottomLink.js";
import { Divider, useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const Main = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const initialized = async () => {
    axios
      .get("/thread/get")
      .then((res) => {
        // console.table(res.data.Threads)
        console.log(res.data.Threads);
        setData(res.data.Threads);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

  useEffect(() => {
    initialized();
  }, []); //[0]動作[1]會觸發動作的事件

  return (
    <div className="Main">
      <TopLink />
      <Header />

      <div className=" container">
        <Postform type={"post"} initialized={initialized} />
        <WarningSign />
      </div>

      <div className=" d-flex justify-content-center m-2">
        <Pagination count={5} shape="rounded" color="primary" />
      </div>
      <Divider />

      <ListThreads threads={data} initialized={initialized} />
      <div className=" d-flex justify-content-center m-2">
        <Pagination count={5} shape="rounded" color="primary" />
      </div>
      <BottomLink />
    </div>
  );
};

export default Main;
