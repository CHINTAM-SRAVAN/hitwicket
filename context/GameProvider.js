import React, { createContext, useState } from 'react';

// Create the GameContext with default values
export const GameContext = createContext();

// Create the GameProvider component
export const GameProvider = ({ children }) => {
  // Initial game state
  const [gameState, setGameState] = useState({
    board: [
      ["B-P1", "B-P2", "B-P3", "B-H1", "B-H2"], // Player B's starting row (top)
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""], // Empty row in between
      ["A-P1", "A-P2", "A-P3", "A-H1", "A-H2"]  // Player A's starting row (bottom)
    ],
    currentPlayer: "A", // Player A starts
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
