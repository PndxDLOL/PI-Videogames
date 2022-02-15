import React from "react";
import styles from "./Videogame.module.css";

export default function Videogame({ name, image, genres, platforms }) {
  return (
    <div className={styles.videogameCard}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className={styles.listContain}>
        <p>Genres:</p>
        <ul className={styles.list}>
          {genres.map((g) => {
            return <li key={g}> |{g}|</li>;
          })}
        </ul>

        <p>Platforms:</p>
        <ul className={styles.list}>
          {platforms.map((p) => {
            return <li key={p}> |{p}|</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
