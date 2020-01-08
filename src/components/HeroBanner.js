import React, { Children } from "react";

const HeroBanner = props => {
  return (
    <div className="banner">
      <h1>{props.title}</h1>
      <div></div>
      <p>{props.subtitle}</p>
      {props.children}
    </div>
  );
};

export default HeroBanner;
