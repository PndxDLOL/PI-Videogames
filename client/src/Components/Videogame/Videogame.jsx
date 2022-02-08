import React from "react";
import { Link } from "react-router-dom";
import styles from "./Videogame.module.css";

export default function Videogame({ id, name, image, genres }) {
  return (
    <Link to={`/videogames/${id}`}>
      <div className={styles.videogameCard}>
        <h3>{name}</h3>
        <img src={image} alt={name} width="200px" height="  250px" />
        <ul>
          {genres.map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      </div>
    </Link>
  );
}
