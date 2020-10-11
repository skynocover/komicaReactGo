import React, { useContext } from "react";
import "../mainstyle.css";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { AppContext } from "../AppContext";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const PostItem = ({
  title,
  name,
  content,
  image,
  parent,
  initPost,
}) => {
  const appCtx = useContext(AppContext);
  const classes = useStyles();
  const [withImage, setWithImage] = React.useState(true);
  const [sage, setSage] = React.useState(false);

  return (
    <div className="d-flex">
      <FormControlLabel
        control={
          <Checkbox
            checked={withImage}
            onChange={() => {
              setWithImage(!withImage);
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
            <Checkbox
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
          appCtx.Post(title, image, content, name, withImage, sage, parent);
          appCtx.setReplyDraw(false)
          initPost != null && initPost();
        }}
      >
        <NavigationIcon className={classes.extendedIcon} />
        發文
      </Fab>
    </div>
  );
};

export default PostItem;
