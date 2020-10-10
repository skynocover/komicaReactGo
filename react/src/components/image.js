import React, { useContext } from "react";
import "../mainstyle.css";

import Reportform from "./reportform.js";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";
import { AppContext } from "../AppContext";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  action: {
    height: 35,
  },
});
export default function Image({ image, imageID }) {
  const classes = useStyles();
  const appCtx = useContext(AppContext);
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
        </CardActionArea>

        <CardActions className={classes.action}>
          <Button color="primary" href={image} target="_blank">
            Link
          </Button>
          <IconButton size="small" onClick={appCtx.toggleReport(true)}>
            <ReportIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
