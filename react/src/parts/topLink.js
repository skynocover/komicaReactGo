import React from "react";
import "../mainstyle.css";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import Reportform from "../components/reportform.js";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const TopLink = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <div className="d-flex justify-content-end">
      <div className={classes.root}>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          
        >
          <Button href="https://www.komica.org" target="_blank">
            komica
          </Button>
          <Button href="https://imgur.com" target="_blank">
            imgur
          </Button>
        </ButtonGroup>
      </div>
      <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
        <div className="m-3">
          <Reportform />
        </div>
      </Drawer>
    </div>
  );
};

export default TopLink;
