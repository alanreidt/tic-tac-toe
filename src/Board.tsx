import React, { useEffect, useMemo, useState } from "react";
import styles from "./Board.module.css";

const checkIsDraw = (gameState: (0 | 1 | undefined)[][]): boolean => {
  return !gameState.some((row) => row.some((item) => item === undefined));
};

const checkIsWin = (
  gameState: (0 | 1 | undefined)[][],
  activePlayer: 0 | 1
): boolean => {
  // check raws for winning combination
  for (let raw = 0; raw < gameState.length; raw++) {
    let count = 0;

    for (let column = 0; column < gameState[0].length; column++) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  // check columns for winning combination
  for (let column = 0; column < gameState.length; column++) {
    let count = 0;

    for (let raw = 0; raw < gameState[0].length; raw++) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  // check columns for diagonal winning combination
  for (
    let initialColumn = 0;
    initialColumn < gameState[0].length;
    initialColumn++
  ) {
    let count = 0;

    for (
      let raw = 0, column = initialColumn;
      raw < gameState.length && column < gameState[0].length;
      raw++, column++
    ) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  // check columns for reverse diagonal winning combination
  for (
    let initialColumn = 0;
    initialColumn < gameState[0].length;
    initialColumn++
  ) {
    let count = 0;

    for (
      let raw = gameState.length - 1, column = initialColumn;
      raw >= 0 && column < gameState[0].length;
      raw--, column++
    ) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  // check raws for diagonal winning combination
  for (let initialRaw = 1; initialRaw < gameState.length; initialRaw++) {
    let count = 0;

    for (
      let raw = initialRaw, column = 0;
      raw < gameState.length && column < gameState[0].length;
      raw++, column++
    ) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  // check raws for reverse diagonal winning combination
  for (let initialRaw = 0; initialRaw < gameState.length; initialRaw++) {
    let count = 0;

    for (
      let raw = initialRaw, column = 0;
      raw >= 0 && column < gameState[0].length;
      raw--, column++
    ) {
      count = gameState[raw][column] === activePlayer ? count + 1 : 0;

      if (count === 3) {
        return true;
      }
    }
  }

  return false;
};

const checkGameStatus = (
  gameState: (0 | 1 | undefined)[][],
  activePlayer: 0 | 1
): "draw" | "win 1" | "win 0" | undefined => {
  if (checkIsDraw(gameState)) {
    return "draw";
  }

  if (activePlayer === 0 && checkIsWin(gameState, activePlayer)) {
    return "win 0";
  }

  if (activePlayer === 1 && checkIsWin(gameState, activePlayer)) {
    return "win 1";
  }

  return;
};

export function Board({
  size,
  onGameStatusChange,
}: {
  size: number;
  onGameStatusChange: (
    gameStatus: "draw" | "win 0" | "win 1" | undefined
  ) => void;
}) {
  const initialGameState = useMemo(() => {
    return Array(size)
      .fill(undefined)
      .map((value) => Array(size).fill(value));
  }, [size]);
  const [gameState, setGameState] =
    useState<(0 | 1 | undefined)[][]>(initialGameState);
  const [activePlayer, setActivePlayer] = useState<0 | 1>(0);

  useEffect(() => {
    onGameStatusChange(checkGameStatus(gameState, activePlayer === 0 ? 1 : 0));
  }, [gameState, activePlayer, onGameStatusChange]);

  const handleButtonClick = (
    targetRowIndex: number,
    targetItemIndex: number
  ) => {
    setGameState((currentState) =>
      currentState.map((row, rowIndex) =>
        row.map((item, itemIndex) =>
          rowIndex === targetRowIndex && itemIndex === targetItemIndex
            ? activePlayer
            : item
        )
      )
    );
    setActivePlayer((currentActivePlayer) => (currentActivePlayer ? 0 : 1));
  };

  return (
    <table className={styles.Board}>
      <tbody>
        {gameState.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, itemIndex) => (
              <td key={itemIndex} className={styles.Cell}>
                <button
                  className={styles.Button}
                  onClick={() => {
                    handleButtonClick(rowIndex, itemIndex);
                  }}
                  disabled={item !== undefined}
                >
                  {item !== undefined && (item === 0 ? "X" : "O")}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
