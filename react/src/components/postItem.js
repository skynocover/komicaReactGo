import React, { useContext } from "react";
import "../mainstyle.css";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useField } from "formik";
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

const PostItem = ({
  onClick,
  withImage,
  sage,
  setWithImage,
  setSage,
  parent,
  initPost,
}) => {
  const appCtx = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className="d-flex">
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={withImage}
            onChange={() => {
              setWithImage("withImage");
            }}
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
              checked={sage}
              onChange={() => {
                setSage(!sage);
              }}
              name="sage"
            />
          }
          label="sage"
        />
      )}

      <div className="flex-fill " />
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.margin}
        size="small"
        onClick={() => {
          onClick();
        }}
      >
        <NavigationIcon className={classes.extendedIcon} />
        發文
      </Fab>
    </div>
  );
};

export default PostItem;
