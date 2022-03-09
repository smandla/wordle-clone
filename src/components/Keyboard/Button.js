import React, { useEffect } from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const keyboardHandler = () => {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (props.allkeys.includes(e.key)) {
        console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
