import React, { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import "./Board.css";

const Board = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className="board">
      {gameState.board.flat().map((cell, index) => (
        <div key={index} className="board-cell">
          {cell ? cell : ""}
        </div>
      ))}
    </div>
  );
};

export default Board;
