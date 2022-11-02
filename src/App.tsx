import React, { useCallback, useState } from "react";
import { Board } from "./Board";
import { GameStatus } from "./GameStatus";

import styles from "./App.module.css";

export default function App() {
  const [gameStatus, setGameStatus] = useState<
    "draw" | "win 0" | "win 1" | undefined
  >();
  const [boardKey, setBoardKey] = useState(Date.now());

  const onGameStatusChange = useCallback(
    (newGameStatus: "draw" | "win 0" | "win 1" | undefined) => {
      setGameStatus(newGameStatus);
    },
    []
  );

  const onPlayAgainButtonClick = useCallback(() => {
    setGameStatus(undefined);
    setBoardKey(Date.now());
  }, []);

  return (
    <div className={styles.App}>
      <h1>Tic Tac Toe</h1>
      <div>
        <Board
          key={boardKey}
          size={3}
          onGameStatusChange={onGameStatusChange}
        />
      </div>
      {gameStatus && (
        <GameStatus
          status={gameStatus}
          onPlayAgainButtonClick={onPlayAgainButtonClick}
        />
      )}
    </div>
  );
}
