import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import styles from "./List.module.css";
import { v4 as uuid } from "uuid";

const List = () => {
  const [list, setList] = useState(() => {
    const data = localStorage.getItem("list");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = e => {
    e.preventDefault();

    if (todo && todo.length <= 25) {
      setList([
        {
          id: uuid(),
          item: todo,
          date: new Date().getDate(),
          time: new Date()
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .toUpperCase(),
        },
        ...list,
      ]);
      setTodo("");
    } else {
      setTodo("");
    }
  };

  const handleDelete = id => {
    const filteredList = list.filter(item => item.id !== id);
    setList(filteredList);
  };

  return (
    <div className={styles.listContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input
          className={styles.input}
          name='todo'
          type='text'
          placeholder='Note'
          value={todo}
          onChange={e => {
            setTodo(e.target.value);
          }}
        />
        <button className={styles.btn}>+</button>
      </form>
      <div className={styles.listItems}>
        {list.map(todo => {
          return (
            <ListItem
              key={todo.id}
              {...todo}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
