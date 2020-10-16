import React from 'react';
import '../mainstyle.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

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
    </div>
  );
};
