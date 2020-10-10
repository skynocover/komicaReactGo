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
  const [pageCount, setPageCount] = useState(1);
  const [page, setpage] = useState(1);

  const handlePage = async (event, value) => {
    setpage(value);
    await getthread(value);
    await getpagecount();
  };

  const getpagecount = async () => {
    axios
      .get("/thread/count")
      .then((res) => {
        setPageCount(Math.ceil(res.data.Count / 10));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

  const getthread = async (page) => {
    axios
      .get("/thread/get?page=" + page)
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

  const initialized = async () => {
    getpagecount();
    getthread(1);
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
        <Pagination
          count={pageCount}
          shape="rounded"
          color="primary"
          page={page}
          onChange={handlePage}
        />
      </div>
      <Divider />

      <ListThreads threads={data} initialized={initialized} />
      <div className=" d-flex justify-content-center m-2">
        <Pagination
          count={pageCount}
          shape="rounded"
          color="primary"
          page={page}
          onChange={handlePage}
        />
      </div>
      <BottomLink />
    </div>
  );
};

export default Main;
