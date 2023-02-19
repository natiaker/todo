import React, { useState, useEffect } from "react";
import styles from "./Clock.module.css";

function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const day = weekdays[currentDate.getDay()];
  const date = `${day} ${currentDate.getDate()}`;
  const clock = currentDate
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  return (
    <header className={styles.header}>
      <p className={styles.date}>{date}</p>
      <h1 className={styles.time}>{clock}</h1>
    </header>
  );
}

export default Clock;
