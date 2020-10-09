import React from "react";
import "../mainstyle.css";

const Contents = () => {
  return (
    <div id="contents">
      $THREADFRONT
      <form action="$SELF" method="post">
        <div id="threads" className="autopagerize_page_element">
          $THREADS
        </div>
        $THREADREAR
        <script type="text/javascript">l2();</script>
      </form>
      $PAGENAV
    </div>
  );
};

export default Contents;
