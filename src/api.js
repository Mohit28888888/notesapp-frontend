import axios from "axios";

const API = axios.create({ baseURL: "https://notesapp-backend-xeh3.onrender.com/api/notes" });

export const getNotes = () => API.get("");
export const createNote = (note) => API.post("", note);
export const updateNote = (id, note) => API.put(`/${id}`, note);
export const deleteNote = (id) => API.delete(`/${id}`);
export const getSharedNote = (shareId) => API.get(`/share/${shareId}`);

