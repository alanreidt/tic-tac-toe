import React, { useState } from "react";
import styles from "./Board.module.css";

export function Board({ size = 3 }) {
  const [state, setState] = useState<(boolean | undefined)[][]>(() =>
    Array(size)
      .fill(undefined)
      .map((value) => Array(size).fill(value))
  );

  return (
    <table className={styles.Board}>
      <tbody>
        {state.map((row) => (
          <tr>
            {row.map((item) => (
              <td className={styles.Cell}>
                <button className={styles.Button}>
                  {item !== undefined && (item ? "X" : "O")}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
