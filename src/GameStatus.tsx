import React from "react";

import styles from "./GameStatus.module.css";

const getStatusText = (status: "draw" | "win 0" | "win 1") => {
  switch (status) {
    case "draw":
      return "You have draw";
    case "win 0":
      return "The first player has won";
    case "win 1":
      return "The second player has won";
  }
};

export function GameStatus({
  status,
  onPlayAgainButtonClick,
}: {
  status: "draw" | "win 0" | "win 1";
  onPlayAgainButtonClick: () => void;
}) {
  return (
    <div className={styles.GameStatus}>
      <span className={styles["GameStatus-Text"]}>{getStatusText(status)}</span>
      <button
        className={styles["GameStatus-Button"]}
        onClick={onPlayAgainButtonClick}
      >
        Play again
      </button>
    </div>
  );
}
