import React, { useEffect, useMemo, useState } from "react";
import styles from "./Board.module.css";

const checkGameStatus = (
  gameState: (0 | 1 | undefined)[][]
): "draw" | "win 1" | "win 0" | undefined => {
  const isDraw = !gameState.some((row) =>
    row.some((item) => item === undefined)
  );

  if (isDraw) {
    return "draw";
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
    onGameStatusChange(checkGameStatus(gameState));
  }, [gameState, onGameStatusChange]);

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
                  {item !== undefined && (item ? "O" : "X")}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
