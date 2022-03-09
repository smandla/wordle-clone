import React, { useState, useEffect, useRef } from "react";
import classes from "./Board.module.css";
// import Game?Tile from "./GameTile";
// import GameRow from "./GameRow";
const newGame = {
  0: Array.from({ length: 5 }).fill(""),
  1: Array.from({ length: 5 }).fill(""),
  2: Array.from({ length: 5 }).fill(""),
  3: Array.from({ length: 5 }).fill(""),
  4: Array.from({ length: 5 }).fill(""),
  5: Array.from({ length: 5 }).fill(""),
};
const Board = (props) => {
  const guessWord = "empty";
  let letterIndex = useRef(0);
  let round = useRef(0);
  const numGuesses = [0, 1, 2, 3, 4, 5];
  const [guesses, setGuesses] = useState({ ...newGame });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: 5 }).fill(" "),
    1: Array.from({ length: 5 }).fill(""),
    2: Array.from({ length: 5 }).fill(""),
    3: Array.from({ length: 5 }).fill(""),
    4: Array.from({ length: 5 }).fill(""),
    5: Array.from({ length: 5 }).fill(""),
  });
  console.log(guesses);
  const enterGuess = async (pressedLetter) => {
    // console.log("u", guesses[round.current].join(""));
    //check to see if word entered is valid
    // console.log("pressedLetter", pressedLetter);
    if (pressedLetter === "enter" && !guesses[round.current].includes("")) {
      //   const validWord = await fetchWord(guesses[round.current].join(""));
      const validWord = guesses[round.current];
      // console.log(validWord);
      if (Array.isArray(validWord)) {
        // console.log("valid");
        const _round = round.current;
        const updatedMarkers = { ...markers };

        const tempWord = guessWord.split("");
        let leftover = [];
        tempWord.forEach((letter, index) => {
          const guessed = guesses[_round][index];
          console.log("guessed", guessed);
          console.log("letter", letter);
          if (guessed === letter) {
            updatedMarkers[_round][index] = "green";
            tempWord[index] = "";
          } else {
            leftover.push(index);
          }
        });
        console.log(updatedMarkers);
        console.log("tempWord", tempWord);
        console.log("leftover", leftover);
        if (updatedMarkers[_round].every((guess) => guess === "green")) {
          setMarkers(updatedMarkers);
          return;
        }
      }
    }
    const _letterIndex = letterIndex.current;
    // console.log(pressedLetter);
    const _round = round.current;
    console.log(_letterIndex, _round);
    if (_letterIndex < 5) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        // console.log("before", newGuesses);
        newGuesses[_round][_letterIndex] = pressedLetter;
        // console.log("after", newGuesses[0].join(""));
        return newGuesses;
      });
      letterIndex.current = _letterIndex + 1;
    }
    // console.log(_round);
    // if (_letterIndex === 5) {
    //   console.log("end", guesses[_round].join(""));
    //   round.current = _round + 1;
    //   console.log(_round);
    // }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      const updatedLetter = e.key.toLowerCase();
      //   console.log(updatedLetter);
      if (props.allkeys.includes(e.key)) {
        enterGuess(updatedLetter);
        // console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  //   console.log("guesses", Object.values(guesses));

  return (
    <div className={classes.game_section}>
      <h1>WORDLE</h1>
      <div className={classes.game_board}>
        {Object.values(guesses).map((word, wordIndex) => (
          <div className={classes.game_row} key={wordIndex}>
            {word.map((letter, i) => (
              <div
                className={classes.game_tile}
                key={i}
                hint={markers[wordIndex][i]}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
