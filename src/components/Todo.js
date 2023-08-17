import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Table from "./Table";
import { db } from "../firebase";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const addTodo = async (e) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Alan2 new",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          <Table />
        </div>
      </div>
    </section>
  );
};

export default Todo;
