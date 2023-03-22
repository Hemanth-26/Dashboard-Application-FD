import React from "react";
import "./header-title.scss";

function HeaderTitle({ title }) {
  return (
    <div className="header-title">
      <h2>{title}</h2>
    </div>
  );
}

export default HeaderTitle;
