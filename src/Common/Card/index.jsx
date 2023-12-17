import React from "react";
import "./card.scss";
import { bool } from "prop-types";

const Card = ({ children, className, ...props }, ref) => {
  return <div className={`card ${className}`}>{children}</div>;
};

Card.propTypes = {
  show: bool,
};

export default Card;
