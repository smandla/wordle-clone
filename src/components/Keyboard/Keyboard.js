import React from "react";
import classes from "./Keyboard.module.css";
import Button from "./Button";
import Row from "./Row";
const Keyboard = (props) => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ];
  const allkeys = keyboard.flat();
  //   console.log(allkeys);
  const createRows = keyboard.map((row) => {
    // console.log("row", row);
    return (
      <Row
        keyboardRow={row}
        allKeys={allkeys}
        key={row}
        enterGuess={props.enterGuess}
      />
    );
  });

  return <div className={classes.keyboard_section}>{createRows}</div>;
};

export default Keyboard;
