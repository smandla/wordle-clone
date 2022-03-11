import React from "react";
import classes from "./Row.module.css";
import Button from "./Button";
const Row = (props) => {
  //   console.log("row js ", props.key);
  const rows = props.keyboardRow.map((row) => {
    // console.log(props.index);
    // console.log("button", row);
    return (
      <Button
        key={row}
        value={row}
        allkeys={props.allKeys}
        enterGuess={props.enterGuess}
      >
        {row}
      </Button>
    );
  });

  return (
    <div className={classes.keyboard_row} index={props.index}>
      {rows}
    </div>
  );
};

export default Row;
