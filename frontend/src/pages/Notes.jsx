import { useEffect, useState } from "react";
import api from "../api/axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [topics, setTopics] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch Topics
  const fetchTopics = async () => {
    try {
      const res = await api.get("/topics");
      setTopics(res.data);

      if (res.data.length > 0 && !topic) {
        setTopic(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchNotes();
  }, []);

  // Add Note
  const addNote = async () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
        topic,
      });

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
      alert("Unable to add note");
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`);

      alert("Note Deleted");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Note
  const updateNote = async () => {
    try {
      await api.put(`/notes/${editingId}`, {
        title: editTitle,
        content: editContent,
      });

      alert("Note Updated");

      setEditingId(null);
      setEditTitle("");
      setEditContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Notes</h1>

      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        {topics.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "300px" }}
      />

      <br />
      <br />

      <textarea
        rows="6"
        cols="60"
        placeholder="Enter Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addNote}>
        Add Note
      </button>

      <hr />

      {notes.length === 0 ? (
        <h3>No Notes Found</h3>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            {editingId === note._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "300px" }}
                />

                <br />
                <br />

                <textarea
                  rows="5"
                  cols="60"
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                />

                <br />
                <br />

                <button onClick={updateNote}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{note.title}</h2>

                <p>{note.content}</p>

                <small>
                  Topic: {note.topic?.name}
                </small>

                <br />
                <br />

                <button
                  onClick={() => {
                    setEditingId(note._id);
                    setEditTitle(note.title);
                    setEditContent(note.content);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteNote(note._id)
                  }
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;