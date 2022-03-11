import React, { useState, useEffect, useRef } from "react";
import classes from "./Board.module.css";
import Keyboard from "../Keyboard/Keyboard";
import Modal from "../Modal/Modal";
// import Dictionary from "../../Data/Dictionary.txt";
// import Game?Tile from "./GameTile";
// import GameRow from "./GameRow";

//API_BASE_URL = 	https://od-api.oxforddictionaries.com/api/v2
// url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/team`;
const url = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const fetchData = (word) => {
  return fetch(`${url}/${word}`, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert("Please enter a valid word!");
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};
// let wordle = "";
// const getRandomWord = async () => {
//   const res = await fetch(Dictionary, {
//     method: "GET",
//   });
//   const data = (await res.text()).split("\n");
//   // console.log(data[Math.floor(Math.random() * data.length)]);
//   // console.log(data);
//   const randomWord = data[
//     Math.floor(Math.random() * data.length)
//   ].toLowerCase();
//   console.log(randomWord);
//   return randomWord;
// };
// wordle = getRandomWord();

const newGame = {
  0: Array.from({ length: 5 }).fill(""),
  1: Array.from({ length: 5 }).fill(""),
  2: Array.from({ length: 5 }).fill(""),
  3: Array.from({ length: 5 }).fill(""),
  4: Array.from({ length: 5 }).fill(""),
  5: Array.from({ length: 5 }).fill(""),
};
// console.log(wordle);

const Board = (props) => {
  let letterIndex = useRef(0);
  let round = useRef(0);
  const randomWord = [
    "Abuse",
    "Adult",
    "Agent",
    "Anger",
    "Apple",
    "Award",
    "Basis",
    "Beach",
    "Birth",
    "Block",
    "Blood",
    "Board",
    "Brain",
    "Bread",
    "Break",
    "Brown",
    "Buyer",
    "Cause",
    "Chain",
    "Chair",
    "Chest",
    "Chief",
    "Child",
    "China",
    "Claim",
    "Class",
    "Clock",
    "Coach",
    "Coast",
    "Court",
    "Cover",
    "Cream",
    "Crime",
    "Cross",
    "Crowd",
    "Crown",
    "Cycle",
    "Dance",
    "Death",
    "Depth",
    "Doubt",
    "Draft",
    "Drama",
    "Dream",
    "Dress",
    "Drink",
    "Drive",
    "Earth",
    "Enemy",
    "Entry",
    "Error",
    "Event",
    "Faith",
    "Fault",
    "Field",
    "Fight",
    "Final",
    "Floor",
    "Focus",
    "Force",
    "Frame",
    "Frank",
    "Front",
    "Fruit",
  ];
  const word = randomWord[
    Math.floor(Math.random() * randomWord.length)
  ].toLowerCase();
  const random = word;
  // const numGuesses = [0, 1, 2, 3, 4, 5];
  // const [word, setWord] = useState();
  const [guesses, setGuesses] = useState({ ...newGame });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: 5 }).fill(""),
    1: Array.from({ length: 5 }).fill(""),
    2: Array.from({ length: 5 }).fill(""),
    3: Array.from({ length: 5 }).fill(""),
    4: Array.from({ length: 5 }).fill(""),
    5: Array.from({ length: 5 }).fill(""),
  });
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   getRandomWord()
  //     .then((response) => response)
  //     .then((data) => setWord(data));

  //   // randomWord();
  // }, []);
  // console.log(word);
  // const random = word;
  /**
   * SUBMIT
   */
  const submit = async () => {
    // console.log(random);
    // let data = randomWord;
    // console.log(data);
    const _round = round.current;
    const updatedMarkers = { ...markers };
    // console.log(guessedWord);
    const tempWord = random.split("");
    // console.log(tempWord);
    let leftover = [];
    tempWord.forEach((letter, index) => {
      const guessed = guesses[_round][index];
      // console.log("guessed", guessed);
      // console.log("letter", letter);
      if (guessed === letter) {
        updatedMarkers[_round][index] = "green";
        tempWord[index] = "";
      } else {
        leftover.push(index);
      }
    });
    // console.log(updatedMarkers);
    // console.log("tempWord", tempWord);
    // console.log("leftover", leftover);
    //only  for ones  that  are right
    if (updatedMarkers[_round].every((guess) => guess === "green")) {
      setMarkers(updatedMarkers);
      setShowModal(true);
      return;
    }
    if (leftover.length) {
      leftover.forEach((index) => {
        const guessed = guesses[_round][index];
        const correctPos = tempWord.indexOf(guessed);
        if (tempWord.includes(guessed) && correctPos !== index) {
          updatedMarkers[_round][index] = "yellow";
          tempWord[correctPos] = "";
        } else {
          updatedMarkers[_round][index] = "grey";
        }
      });
    }
    setMarkers(updatedMarkers);
    round.current = _round + 1;
    //reset letterIndex = 0 to restart guessing
    letterIndex.current = 0;
  };
  const remove = () => {
    // console.log("REMOVE");
    // console.log(pressedLetter);
    const _letterIndex = letterIndex.current;
    const _round = round.current;
    // console.log(_round, _letterIndex);
    if (_letterIndex <= 5) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = "";
        return newGuesses;
      });
      letterIndex.current = _letterIndex - 1;
    }
  };

  const publish = (pressedLetter) => {
    const _letterIndex = letterIndex.current;
    // console.log(pressedLetter);
    const _round = round.current;
    // console.log(_letterIndex, _round);
    if (_letterIndex < 5) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        // console.log("before", newGuesses);
        newGuesses[_round][_letterIndex] = pressedLetter.toLowerCase();
        // console.log("after", newGuesses[0].join(""));
        return newGuesses;
      });
      letterIndex.current = _letterIndex + 1;
    }
  };

  // console.log(guesses);
  const enterGuess = async (pressedLetter) => {
    // console.log("ACTUA", randomWord);
    // console.log("u", guesses[round.current]);
    //check to see if word entered is valid
    // console.log("pressedLetter", pressedLetter);
    if (pressedLetter === "enter") {
      // console.log("sdsd");
      let validWord = await fetchData(guesses[round.current].join(""));

      // const validWord = guesses[round.current];
      validWord = validWord[0].word;
      // console.log(validWord, validWord.length);
      if (validWord.length === 5) {
        // console.log("valid", validWord[0].);
        submit();
      } else {
        alert("Please enter a letter for every space!");
      }
    } else if (pressedLetter === "backspace") {
      remove();
    } else if (pressedLetter !== "enter") {
      publish(pressedLetter);
    }
  };
  useEffect(() => {
    // const
    // setWord(validWord);

    const handleKeyDown = (e) => {
      // console.log(props.allkeys);
      const updatedLetter = e.key.toLowerCase();
      // console.log(props.allkeys.includes(updatedLetter));
      // console.log("updatedLetter", updatedLetter);
      if (props.allkeys.includes(updatedLetter)) {
        // console.log(updatedLetter);
        enterGuess(updatedLetter);
        // console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // console.log("markers", markers);

  return (
    <div>
      {showModal ? <Modal /> : ""}

      <div className={classes.game_section}>
        <h1>Wordle</h1>
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
      <Keyboard enterGuess={enterGuess} />
    </div>
  );
};

export default Board;
