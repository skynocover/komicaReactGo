import React, { useContext } from 'react';
import '../mainstyle.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from '../AppContext';
import Reportform from '../components/reportform.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default () => {
  const classes = useStyles();
  const appCtx = useContext(AppContext);
  return (
    <div className="d-flex justify-content-center">
      <div className={classes.root}>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button onClick={appCtx.toggle(true, <Reportform />)}>
            錯誤回報
          </Button>
          <Button href="https://github.com/skynocover" target="_blank">
            Github
          </Button>
          <Button
            onClick={() => {
              window.location.href = `/#/?page=1`;
              appCtx.getthread();
            }}
          >
            回首頁
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
