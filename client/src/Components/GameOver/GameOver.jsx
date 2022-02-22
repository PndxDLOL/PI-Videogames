import React from "react";
import styles from "./GameOver.module.css";

export default function GameOver() {
  return (
    <div className={styles.gameOver}>
      <h1>GAME OVER</h1>
      <h3>Try a another search</h3>
    </div>
  );
}
