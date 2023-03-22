import React from "react";
import { MiniDrawer } from "../components/index";

function PostLoginLayout(props) {
  const { children } = props;

  return (
    <div className="d-flex flex-row flex-grow-1">
      <MiniDrawer>{children}</MiniDrawer>
      {/* <main className="main_container d-flex flex-column">{children}</main> */}
    </div>
  );
}

export default PostLoginLayout;
