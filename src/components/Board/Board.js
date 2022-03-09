import React from "react";
import classes from "./Board.module.css";
import GameTile from "./GameTile";
import GameRow from "./GameRow";
const Board = () => {
  const numGuesses = [0, 1, 2, 3, 4, 5];
  const mappedBoard = numGuesses.map((guess) => {
    return <GameRow key={guess} />;
  });
  return (
    <div className={classes.game_section}>
      <h1>WORDLE</h1>
      <div className={classes.game_board}>{mappedBoard}</div>
    </div>
  );
};

export default Board;
