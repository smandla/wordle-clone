import React, { useEffect } from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const keyboardHandler = (key) => {
    const pressedKey = key.target.outerText.toLowerCase();
    // console.log(pressedKey);
    props.enterGuess(pressedKey);
    // console.log(key.target.outerText);
  };

  return (
    <button
      className={classes.keyboard_button}
      onClick={keyboardHandler}
      // key={props.key}
    >
      {props.children}
    </button>
  );
};

export default Button;
