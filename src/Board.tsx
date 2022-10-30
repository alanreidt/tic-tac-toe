import React from "react";
import styles from "./Board.module.css";

export function Board() {
  return (
    <table className={styles.Board}>
      <tbody>
        <tr>
          <td className={styles.Cell}>
            <button className={styles.Button}>X</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>O</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>X</button>
          </td>
        </tr>
        <tr>
          <td className={styles.Cell}>
            <button className={styles.Button}>O</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>X</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>X</button>
          </td>
        </tr>
        <tr>
          <td className={styles.Cell}>
            <button className={styles.Button}>O</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>O</button>
          </td>
          <td className={styles.Cell}>
            <button className={styles.Button}>X</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
