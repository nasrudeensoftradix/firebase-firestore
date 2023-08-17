import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Table() {
  const [todos, setTodos] = useState([]);

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let res = querySnapshot?.docs?.map((doc) => ({
      ...doc.data(),
    }));
    console.log(res, 5645445);
    setTodos(res || []);
  };

  useEffect(() => {
    fetchPost();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", "documentId"),
      (snapshot) => {
        // setData(snapshot.data());
        console.log(snapshot, "544554");
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {todos?.map((todo, i) => (
        <p key={i}>{todo.first}</p>
      ))}
    </div>
  );
}
