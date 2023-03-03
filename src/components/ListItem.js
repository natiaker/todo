import React, { useState } from "react";
import styles from "./ListItem.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const ListItem = ({ id, item, date, time, handleDelete }) => {
  const olderDate = date;
  const currentDate = new Date().getDate();
  const diff = currentDate - olderDate;
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const newDate = formatter.format(Math.round(diff), "day");

  const [isChecked, setIsChecked] = useState(
    JSON.parse(localStorage.getItem(id))
  );

  const handleCheckboxChange = e => {
    localStorage.setItem(id, e.target.checked);
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>{item}</h1>
        <p>
          {newDate} at {time}
        </p>
      </div>
      <div className={styles.div}>
        <input
          type='checkbox'
          id={id}
          checked={isChecked}
          className={styles.checkbox}
          onChange={handleCheckboxChange}
        />
        <RiDeleteBin6Line
          fill='red'
          size={25}
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default ListItem;
