import React, { useContext } from 'react';
import '../mainstyle.css';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Image from '../components/image.js';
import ThreadLabel from '../components/threadLabel.js';
import { AppContext } from '../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ReactMarkdown = require('react-markdown');
const Reply = ({ reply }) => {
  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={reply} />
      </div>
      <div className="row p-2 justify-content-center">
        {reply.image && (
          <div className="col-sm-4 p-2 ">
            <Image image={reply.image} id={reply.id} />
          </div>
        )}
        <div className="col-sm-5 col-no-gutters p-2 ">
          <ReactMarkdown source={reply.content} />
        </div>
      </div>
    </>
  );
};

const Thread = ({ thread }) => {
  const classes = useStyles();
  const appCtx = useContext(AppContext);
  const folder = appCtx.SingleThread ? thread.reply?.length : 3;

  return (
    <>
      <div className="row pt-2 justify-content-center">
        <ThreadLabel post={thread} />
      </div>
      <div className="row p-2 justify-content-center ">
        {thread.image && (
          <div className="col-sm-4 p-2 ">
            <Image image={thread.image} id={thread.id} />
          </div>
        )}

        <div className="col-sm-5 p-2">
          <ReactMarkdown source={thread.content} />
        </div>
      </div>
      {thread.reply != null && (
        <>
          <div className="row justify-content-center">
            <div className="container">
              {thread.reply
                .filter((item, index) => index < folder)
                .map((item) => (
                  <Reply key={item.id} reply={item} />
                ))}
            </div>
          </div>
          {thread.reply.length > folder && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  被隱藏的回應
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="container-fluid">
                  {thread.reply
                    .filter((item, index) => index >= folder)
                    .map((item) => (
                      <Reply key={item.id} reply={item} />
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}

      <Divider className="m-3 row" />
    </>
  );
};

const ListThreads = () => {
  const appCtx = useContext(AppContext);
  return (
    <div className="container">
      {appCtx.thread.map((item) => (
        <Thread key={item.id} thread={item} />
      ))}
    </div>
  );
};

export default ListThreads;
