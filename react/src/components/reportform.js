import React, { useContext } from "react";
import "../mainstyle.css";

import TextField from "@material-ui/core/TextField";

import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { AppContext } from "../AppContext";

const ReportForm = () => {
  const [reason, setReason] = React.useState("bug");
  const [content, setContent] = React.useState("");
  const appCtx = useContext(AppContext);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-sm-8 col-md-6 col-12 d-flex flex-column bd-highlight ">
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">回報原因</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
            }}
          >
            <MenuItem value={"bug"}>Bug</MenuItem>
            <MenuItem value={"del"}>刪文請求</MenuItem>
            <MenuItem value={"war"}>引戰</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="filled-basic"
          multiline
          rows={4}
          label="回報內容"
          variant="filled"
          placeholder="可使用markdown語法"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => {
            appCtx.Report(reason, content);
            appCtx.setReportDraw(false);
          }}
        >
          <NavigationIcon />
          回報
        </Fab>
      </div>
    </div>
  );
};

export default ReportForm;
