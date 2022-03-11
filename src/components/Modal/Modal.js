import React from "react";
import classes from "./Modal.module.css";
const Modal = (props) => {
  const newGameHandler = () => {};
  return (
    <div className={classes.overlay}>
      <div className={classes.content}>
        You've Won!<button onClick={newGameHandler}>New Game</button>
      </div>
    </div>
  );
};

export default Modal;
