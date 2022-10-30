import React, { useState } from "react";
import styles from "./Board.module.css";

export function Board({ size = 3 }) {
  const [state, setState] = useState<(0 | 1 | undefined)[][]>(() =>
    Array(size)
      .fill(undefined)
      .map((value) => Array(size).fill(value))
  );
  const [activePlayer, setActivePlayer] = useState<0 | 1>(0);

  const handleButtonClick = (
    targetRowIndex: number,
    targetItemIndex: number
  ) => {
    setState((currentState) =>
      currentState.map((row, rowIndex) =>
        row.map((item, itemIndex) =>
          rowIndex === targetRowIndex &&
          itemIndex === targetItemIndex &&
          item === undefined
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
        {state.map((row, rowIndex) => (
          <tr>
            {row.map((item, itemIndex) => (
              <td className={styles.Cell}>
                <button
                  className={styles.Button}
                  onClick={() => {
                    handleButtonClick(rowIndex, itemIndex);
                  }}
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
