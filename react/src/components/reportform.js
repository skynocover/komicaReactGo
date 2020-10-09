import React from "react";
import "../mainstyle.css";

import TextField from "@material-ui/core/TextField";

import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";


const ReportForm = ({ drawOpen,handleClick }) => {
  const [reason, setReason] = React.useState("bug");
  const [content, setContent] = React.useState("");
  
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const Report = () => {
    axios
      .post("/report/post", {
        reason,
        content,
      })
      .then((res) => {
        console.table(res.data);
        handleClick();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        /* 不論失敗成功皆會執行 */
      });
  };

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
            onChange={handleChange}
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
            Report();
            drawOpen(false);
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
