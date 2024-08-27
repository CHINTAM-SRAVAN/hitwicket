import React, { useState, useContext } from "react";
import { GameContext } from "../context/GameProvider";
import "./GameControls.css";

const GameControls = () => {
  const [move, setMove] = useState("");
  const { gameState, setGameState } = useContext(GameContext);

  const handleInputChange = (e) => {
    setMove(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [character, direction] = move.split(":");

    if (!character || !direction) {
      alert("Invalid command format! Use <character>:<move>");
      return;
    }

    const currentPlayer = gameState.currentPlayer;
    if (!character.startsWith(currentPlayer)) {
      alert("It's not your turn!");
      return;
    }

    const updatedBoard = gameState.board.map(row => row.slice()); // Create a copy of the board

    // Find the position of the character
    let row, col;
    let found = false;
    outerLoop:
    for (row = 0; row < updatedBoard.length; row++) {
      for (col = 0; col < updatedBoard[row].length; col++) {
        if (updatedBoard[row][col] === character) {
          found = true;
          break outerLoop;
        }
      }
    }

    if (!found) {
      alert("Character not found on the board.");
      return;
    }

    // Determine the player's perspective
    const isPlayerA = character.startsWith("A");

    // Calculate the new position based on the move direction
    let newRow = row, newCol = col;
    const isPawn = character.startsWith("P");
    const moveStep = isPawn ? 1 : 2; // Pawns move 1 step, heroes move 2 steps

    switch (direction) {
      case "F":
        newRow += isPlayerA ? -moveStep : moveStep; // Move forward (A: north, B: south)
        break;
      case "B":
        newRow += isPlayerA ? moveStep : -moveStep; // Move backward (A: south, B: north)
        break;
      case "L":
        newCol += isPlayerA ? -moveStep : moveStep; // Move left (A: left, B: right)
        break;
      case "R":
        newCol += isPlayerA ? moveStep : -moveStep; // Move right (A: right, B: left)
        break;
      case "FL":
        if (character.startsWith("H2")) {
          newRow += isPlayerA ? -moveStep : moveStep; // Forward (A: north, B: south)
          newCol += isPlayerA ? -moveStep : moveStep; // Left (A: left, B: right)
        } else {
          alert("Invalid move command for this character!");
          return;
        }
        break;
      case "FR":
        if (character.startsWith("H2")) {
          newRow += isPlayerA ? -moveStep : moveStep; // Forward (A: north, B: south)
          newCol += isPlayerA ? moveStep : -moveStep; // Right (A: right, B: left)
        } else {
          alert("Invalid move command for this character!");
          return;
        }
        break;
      case "BL":
        if (character.startsWith("H2")) {
          newRow += isPlayerA ? moveStep : -moveStep; // Backward (A: south, B: north)
          newCol += isPlayerA ? -moveStep : moveStep; // Left (A: left, B: right)
        } else {
          alert("Invalid move command for this character!");
          return;
        }
        break;
      case "BR":
        if (character.startsWith("H2")) {
          newRow += isPlayerA ? moveStep : -moveStep; // Backward (A: south, B: north)
          newCol += isPlayerA ? moveStep : -moveStep; // Right (A: right, B: left)
        } else {
          alert("Invalid move command for this character!");
          return;
        }
        break;
      default:
        alert("Invalid move command!");
        return;
    }

    // Validate the new position
    if (newRow < 0 || newRow >= 5 || newCol < 0 || newCol >= 5) {
      alert("Invalid move! Out of bounds.");
      return;
    }

    // Check if the destination cell is occupied by another character
    if (updatedBoard[newRow][newCol] && updatedBoard[newRow][newCol] !== character) {
      if (isPawn) {
        // Pawns cannot kill, so this move is invalid
        alert("Invalid move! Pawns cannot kill characters.");
        return;
      }
    }

    // Move the character on the board
    updatedBoard[row][col] = ""; // Clear old position
    updatedBoard[newRow][newCol] = character; // Place character in new position

    // Update game state
    setGameState((prevState) => ({
      ...prevState,
      board: updatedBoard,
      currentPlayer: currentPlayer === "A" ? "B" : "A", // Switch player
    }));

    setMove(""); // Clear input field
  };

  return (
    <div className="game-controls">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={move}
          onChange={handleInputChange}
          placeholder="Enter your move (e.g., P1:L, H1:F)"
        />
        <button type="submit">Submit Move</button>
      </form>
    </div>
  );
};

export default GameControls;
