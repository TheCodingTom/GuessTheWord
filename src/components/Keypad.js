import React, { useEffect, useState } from "react";

function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);

  const getLetters = async () => {
    const response = await fetch("http://localhost:3001/letters");
    const result = await response.json();
    setLetters(result);
  };

  useEffect(() => {
    getLetters();
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}

export default Keypad;
