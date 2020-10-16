import React, { useContext } from 'react';
import '../mainstyle.css';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NavigationIcon from '@material-ui/icons/Navigation';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';

import { AppContext } from '../AppContext';

const ReportForm = ({ id }) => {
  const appCtx = useContext(AppContext);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        reason: 'bug',
        content: '',
      }}
      validateOnChange={false}
      validate={(values) => {
        const errors = {};
        if (!values.content) {
          errors.content = '回報內容必填';
        }
        return errors;
      }}
      onSubmit={(values, action) => {
        appCtx.Report(id, values.reason, values.content);
        appCtx.setDrawOpen(false);
        action.resetForm();
      }}
    >
      {({ handleSubmit, values, errors, handleChange }) => (
        <div className="row justify-content-center">
          <div className="col-lg-5 col-sm-8 col-md-6 col-12 d-flex flex-column bd-highlight ">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                回報原因
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="reason"
                value={values.reason}
                onChange={handleChange}
              >
                <MenuItem value={'bug'}>Bug</MenuItem>
                <MenuItem value={'del'}>刪文請求</MenuItem>
                <MenuItem value={'war'}>引戰</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="filled-basic"
              multiline
              error={errors.content && true}
              helperText={errors.content}
              rows={4}
              label="回報內容"
              variant="filled"
              placeholder="可使用markdown語法"
              name="content"
              onChange={handleChange}
            />
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleSubmit}
            >
              <NavigationIcon />
              回報
            </Fab>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ReportForm;
