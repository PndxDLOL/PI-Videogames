import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.containLanding}>
      <div className={styles.landingcontent}>
        <h1 className={styles.name}>Arcade Zone</h1>
        <h1 className={styles.credits}>1/1 Credits</h1>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className={styles.button}>Start</div>
        </Link>
      </div>
    </div>
  );
}
