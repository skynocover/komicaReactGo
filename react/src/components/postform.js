import React from "react";
import "../mainstyle.css";

import TextField from "@material-ui/core/TextField";
import PostItem from "./postItem.js";

const Postform = ({ parent }) => {
  const [title, setTitle] = React.useState("");
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");

  const initPost = () => {
    setTitle("");
    setName("");
    setContent("");
    setImage("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-sm-8 col-md-6 col-12 d-flex flex-column bd-highlight ">
          {!parent && (
            <TextField
              id="filled-basic"
              label="標題"
              variant="filled"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          )}
          <TextField
            id="filled-basic"
            label="名稱"
            variant="filled"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            onChange={(event) => setContent(event.target.value)}
            id="filled-basic"
            multiline
            rows={4}
            label="內文"
            variant="filled"
            value={content}
            placeholder="可使用markdown語法"
          />
          <TextField
            id="filled-basic"
            label="附加圖檔網址"
            variant="filled"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <PostItem
            title={title}
            name={name}
            content={content}
            image={image}
            parent={parent}
            initPost={initPost}
          />
        </div>
      </div>
    </div>
  );
};

export default Postform;
