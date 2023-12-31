import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Table({ setItem, handleDelete }) {
  const [items, setItems] = useState([]);

  /* function to get all item from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, "users"), orderBy("first", "asc"));
    onSnapshot(taskColRef, (snapshot) => {
      setItems(
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
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Born</th>
            <th>Action</th>
          </tr>
          {items?.map((todo, i) => {
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
                      onClick={() => setItem({ ...todo?.data, id: todo.id })}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
