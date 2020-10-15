import React, { useContext } from "react";
import "../mainstyle.css";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { Formik, useField } from "formik";
import { AppContext } from "../AppContext";

const MuiCheckbox = ({ ...props }) => {
  const [field] = useField(props.name);
  return <Checkbox {...field} color={props.color} checked={field.value} />;
};

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Postform = ({ parent }) => {
  const appCtx = useContext(AppContext);
  const classes = useStyles();
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
      validateOnChange={false}
      validate={(values) => {
        const errors = {};
        if (!parent && !values.title) {
          errors.title = "標題必填";
        } else if (!values.content) {
          errors.content = "內文必填";
        } else if (values.image && !values.withImage) {
          errors.image = "附圖請符合勾選規則"
        } else if (!values.image && values.withImage) {
          errors.image = "附圖請符合勾選規則"
        }
        return errors;
      }}
      onSubmit={(values, action) => {
        appCtx.Post(
          values.title,
          values.image,
          values.content,
          values.name,
          values.withImage,
          values.sage,
          parent,
        );
        appCtx.setDrawOpen(false);
        action.resetForm();
      }}
    >
      {({ handleSubmit, values, errors, handleChange }) => (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-sm-8 col-md-6 col-12 d-flex flex-column bd-highlight ">
              {!parent && (
                <TextField
                  error={errors.title&&true}
                  helperText={errors.title}
                  name="title"
                  label="標題"
                  variant="filled"
                  value={values.title}
                  onChange={handleChange}
                />
              )}
              
              <TextField
                name="name"
                label="名稱"
                variant="filled"
                value={values.name}
                onChange={handleChange}
              />
              <TextField
                error={errors.content&&true}
                helperText={errors.content}
                name="content"
                onChange={handleChange}
                multiline
                rows={4}
                label="內文"
                variant="filled"
                value={values.content}
                placeholder="可使用markdown語法"
              />
              <TextField
                error={errors.image&&true}
                helperText={errors.image}
                name="image"
                label="附加圖檔網址"
                variant="filled"
                value={values.image}
                onChange={handleChange}
              />
              <div className="d-flex" >
              <FormControlLabel
                control={
                  <MuiCheckbox
                    checked={"withImage"}
                    onChange={handleChange}
                    name="withImage"
                    color="primary"
                  />
                }
                label="附圖"
              />
              {parent && (
                <FormControlLabel
                  control={
                    <MuiCheckbox
                      checked={"sage"}
                      onChange={handleChange}
                      name="sage"
                    />
                  }
                  name="sage"
                  label="sage"
                />
              )}
              <div className="flex-fill" />
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  size="small"
                  onClick={handleSubmit}
                >
                  <NavigationIcon className={classes.extendedIcon} />
                  發文
                </Fab>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Postform;
