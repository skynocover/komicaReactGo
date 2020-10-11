import React from "react";
import "../mainstyle.css";

import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";

export default () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1>Dota2 / Underlords</h1>
      </div>
      <div className="row justify-content-center ">
        <Button
          variant="outlined"
          color="primary"
          href="http://www.dota2.com/play/"
          target="_blank"
        >
          Dota2
        </Button>
        <Button
          color="primary"
          variant="outlined"
          href="https://dota2.gamepedia.com/Dota_2_Wiki"
          target="_blank"
        >
          Dota2 Wiki
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="https://underlords.com"
          target="_blank"
        >
          Underlords
        </Button>
      </div>
      <Divider />
    </div>
  );
};
