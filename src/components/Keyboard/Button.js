import React, { useEffect } from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const keyboardHandler = () => {};

  return (
    <button
      className={classes.keyboard_button}
      onClick={keyboardHandler}
      key={props.key}
    >
      {props.children}
    </button>
  );
};

export default Button;
