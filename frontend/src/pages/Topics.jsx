import { useEffect, useState } from "react";
import api from "../api/axios";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [name, setName] = useState("");
  const [chapter, setChapter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch Chapters
  const fetchChapters = async () => {
    try {
      const res = await api.get("/chapters");
      setChapters(res.data);

      if (res.data.length > 0 && !chapter) {
        setChapter(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Topics
  const fetchTopics = async () => {
    try {
      const res = await api.get("/topics");
      setTopics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChapters();
    fetchTopics();
  }, []);

  // Add Topic
  const addTopic = async () => {
    if (!name.trim()) {
      alert("Enter Topic Name");
      return;
    }

    if (!chapter) {
      alert("Select Chapter");
      return;
    }

    try {
      await api.post("/topics", {
        name,
        chapter,
      });

      setName("");
      fetchTopics();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Topic
  const deleteTopic = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this topic?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/topics/${id}`);

      alert("Topic Deleted");

      fetchTopics();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Topic
  const updateTopic = async () => {
    if (!editName.trim()) {
      alert("Enter Topic Name");
      return;
    }

    try {
      await api.put(`/topics/${editingId}`, {
        name: editName,
      });

      alert("Topic Updated");

      setEditingId(null);
      setEditName("");

      fetchTopics();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Topics</h1>

      <select
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      >
        {chapters.map((chap) => (
          <option key={chap._id} value={chap._id}>
            {chap.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Topic Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={addTopic}
        style={{ marginLeft: "10px" }}
      >
        Add Topic
      </button>

      <hr />

      {topics.length === 0 ? (
        <h3>No Topics Found</h3>
      ) : (
        topics.map((topic) => (
          <div
            key={topic._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              {editingId === topic._id ? (
                <input
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                />
              ) : (
                <>
                  <h3>{topic.name}</h3>
                  <small>
                    Chapter: {topic.chapter?.name}
                  </small>
                </>
              )}
            </div>

            <div>
              {editingId === topic._id ? (
                <button onClick={updateTopic}>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(topic._id);
                    setEditName(topic.name);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={() =>
                  deleteTopic(topic._id)
                }
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Topics;