import React from "react";

function PreLoginLayout(props) {
  const { children } = props;
  return (
    <main className="d-flex align-items-center p-2 flex-grow-1">
      {children}
      </main>
  )
}

export default PreLoginLayout;
