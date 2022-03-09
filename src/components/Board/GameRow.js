import React from "react";
import classes from "./GameRow.module.css";
import GameTile from "./GameTile";
const GameRow = (props) => {
  const numLetters = [0, 1, 2, 3, 4];
  const mappedData = numLetters.map((letter) => {
    return <GameTile key={letter}>{letter}</GameTile>;
  });
  return <div className={classes.game_row}>{mappedData}</div>;
};

export default GameRow;
