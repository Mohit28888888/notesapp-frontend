import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedNote } from "./api";

export default function ShareNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getSharedNote(shareId).then(res => setNote(res.data));
  }, [shareId]);

  if (!note) return <h2>Loading...</h2>;

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h1>Shared Note</h1>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
