import React, { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "./api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null); // track which note is being edited

  // fetch notes on page load
  useEffect(() => {
    getNotes().then(res => setNotes(res.data));
  }, []);

  const handleAdd = async () => {
    const newNote = { title, content, shared: true };
    await createNote(newNote);
    const res = await getNotes();
    setNotes(res.data);
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleUpdate = async (id) => {
    const updatedNote = { title, content, shared: true };
    await updateNote(id, updatedNote);
    const res = await getNotes();
    setNotes(res.data);
    setTitle("");
    setContent("");
    setEditingId(null); // exit edit mode
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleCopyLink = (note) => {
    const shareLink = `http://localhost:5173/share/${note.shareId}`;
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard: " + shareLink);
  };


  return (
  <div className="container">
    <h1>Notes App</h1>
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <button onClick={handleAdd}>Add Note</button>

    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <b>{note.title}</b>: {note.content}
          <div>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
            {editingId === note.id ? (
              <button onClick={() => handleUpdate(note.id)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(note)}>Edit</button>
            )}
            <button onClick={() => handleCopyLink(note)}>Copy Share Link</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}