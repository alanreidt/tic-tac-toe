import React from "react";
import { Board } from "./Board";

import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.App}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.Board}>
        <Board />
      </div>
    </div>
  );
}
