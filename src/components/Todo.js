import React, { useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import Table from "./Table";
import { db } from "../firebase";

const Todo = () => {
  //States
  const [todo, setTodo] = useState({
    first: "",
    middle: "",
    last: "",
    born: "",
  });

  //Destructur
  const { first, last, born, middle } = todo;

  //onchange handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  //Add item
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      let docRef = "";
      if (todo?.id) {
        const todoDocRef = doc(db, "users", todo.id);
        docRef = await updateDoc(todoDocRef, todo);
      } else {
        docRef = await addDoc(collection(db, "users"), todo);
      }
      setTodo({
        first: "",
        middle: "",
        last: "",
        born: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "users", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Firestor Todo-App</h1>

        <form onSubmit={addTodo}>
          <div className="add_container">
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="What do you have to do today?"
                name={"first"}
                required
                value={first}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="What do you have to do today?"
                name={"last"}
                value={last}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label>Middle Name</label>
              <input
                type="text"
                placeholder="What do you have to do today?"
                name={"middle"}
                value={middle}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label>Middle Name</label>
              <input
                type="date"
                placeholder="What do you have to do today?"
                name={"born"}
                value={born}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="btn">
                {todo?.id ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>

        <div className="todo-content">
          <Table setTodo={setTodo} handleDelete={handleDelete} />
        </div>
      </div>
    </section>
  );
};

export default Todo;
