import React, { useContext, useState } from "react";
import "../mainstyle.css";
import { AppContext } from "../AppContext";
import TextField from "@material-ui/core/TextField";
import PostItem from "./postItem.js";
import { Formik } from "formik";
import { Button } from "@material-ui/core";
const Postform = ({ parent }) => {
  const appCtx = useContext(AppContext);
  const [hasSubmit, setHasSubmit] = useState(false);
  return (
    <Formik
      initialValues={{
        title: "",
        name: "",
        content: "",
        image: "",
        withImage: false,
        sage: false,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Required";
        } else if (!values.content) {
          errors.content = "Required";
        }
        return errors;
      }}
      // initPost={title=""}
      onSubmit={(values, action) => {
        appCtx.Post(
          values.title,
          values.image,
          values.content,
          values.name,
          values.withImage,
          values.sage,
          values.parent
        );
        appCtx.setDrawOpen(false);
        setHasSubmit(false);
        // initPost != null && initPost();
        alert(JSON.stringify(values, null, 2));
        action.resetForm();
      }}
    >
      {({ handleSubmit, values, errors, handleChange, handleReset }) => (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-sm-8 col-md-6 col-12 d-flex flex-column bd-highlight ">
              {!parent && (
                <TextField
                  helperText={hasSubmit && errors.title}
                  name="title"
                  id="filled-basic"
                  label="標題"
                  variant="filled"
                  value={values.title}
                  onChange={handleChange("title")}
                />
              )}

              <TextField
                name="name"
                id="filled-basic"
                label="名稱"
                variant="filled"
                value={values.name}
                onChange={handleChange("name")}
              />
              <TextField
                name="content"
                onChange={handleChange("content")}
                id="filled-basic"
                multiline
                rows={4}
                label="內文"
                variant="filled"
                value={values.content}
                placeholder="可使用markdown語法"
              />
              <TextField
                name="image"
                id="filled-basic"
                label="附加圖檔網址"
                variant="filled"
                value={values.image}
                onChange={handleChange("image")}
              />
              <PostItem
                withImage={values.withImage}
                sage={values.sage}
                parent={parent}
                setWithImage={handleChange("withImage")}
                setSage={handleChange}
                onClick={() => {
                  setHasSubmit(true);
                  handleSubmit();
                  //
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Postform;
