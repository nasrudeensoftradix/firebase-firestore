import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Table({ setTodo, handleDelete }) {
  const [todos, setTodos] = useState([]);

  /* function to get all item from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, "users"));
    onSnapshot(taskColRef, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Middle Name</th>
          <th>Born</th>
          <th>Action</th>
        </tr>
        {todos?.map((todo, i) => {
          const { first, last, middle, born } = todo?.data;
          return (
            <tr key={todo.id}>
              <td>{first}</td>
              <td>{last}</td>
              <td>{middle}</td>
              <td>{born}</td>
              <td>
                <div className="action_btn">
                  <button
                    onClick={() => setTodo({ ...todo?.data, id: todo.id })}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
