import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingcontent}>
      <h1 className={styles.name}>Gamee App</h1>
      <Link to="/home">
        <button className={styles.button}>Ingresar</button>
      </Link>
    </div>
  );
}
