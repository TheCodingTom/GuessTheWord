import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string - to avoid duplicates
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects --> [{key: "a", color: "yellow"}]
  const formatGuess = () => {
    // transform strings into arrays of letters
    let solutionArray = [...solution];
    // for each letter we return an object
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        // this is to prevent coloring a green letter into yellow - avoid double matching letters
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state (history of guesses)
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {};

  // handle keyip event & track current guess - if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried this word");
        return;
      }
      // word length must be 5 characters
      if (currentGuess.length !== 5) {
        console.log("word must be 5 characters long");
        return;
      }

      const formatted = formatGuess();
      console.log(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        // start is 0: first letter of array, -1 removes the last letter of the array
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
