import React from "react";
import "../styles/components/spinner.scss";

const Spinner = ({width, margin,color} : {width?: string, margin?: string, color?: string}) => {
  return (
    <div className="lds-circle">
      <div style={{
        width: width,
        height: width,
        margin: margin,
        backgroundColor: color
      }}></div>
    </div>
  );
};

export default Spinner;
