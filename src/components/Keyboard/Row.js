import React from "react";
import classes from "./Row.module.css";
import Button from "./Button";
const Row = (props) => {
  //   console.log("row js ", props.key);
  const rows = props.keyboardRow.map((row) => {
    // console.log("button", row);
    return (
      <Button key={row} value={row} allkeys={props.allKeys}>
        {row}
      </Button>
    );
  });

  return <div className={classes.keyboard_row}>{rows}</div>;
};

export default Row;
