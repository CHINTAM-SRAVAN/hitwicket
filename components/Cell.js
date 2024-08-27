import React from "react";
import "./Cell.css";

const Cell = ({ cell }) => {
  return (
    <div className={`cell ${cell ? "occupied" : ""}`}>
      {cell ? <span>{cell}</span> : <span>&middot;</span>}
    </div>
  );
};

export default Cell;
