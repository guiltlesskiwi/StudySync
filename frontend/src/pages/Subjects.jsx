import { useEffect, useState } from "react";
import api from "../api/axios";


function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  // Edit States
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch Subjects
  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add Subject
  const addSubject = async () => {
    if (!name.trim()) {
      alert("Enter Subject Name");
      return;
    }

    try {
      await api.post("/subjects", { name });

      setName("");

      fetchSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Subject
  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/subjects/${id}`);

      alert("Subject Deleted Successfully");

      fetchSubjects();
    } catch (error) {
      console.log(error);
      alert("Failed to delete subject");
    }
  };

  // Update Subject
  const updateSubject = async () => {
    if (!editName.trim()) {
      alert("Enter Subject Name");
      return;
    }

    try {
      await api.put(`/subjects/${editingId}`, {
        name: editName,
      });

      alert("Subject Updated Successfully");

      setEditingId(null);
      setEditName("");

      fetchSubjects();
    } catch (error) {
      console.log(error);
      alert("Failed to update subject");
    }
  };

return (
  <>
    <Navbar />

    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
<h1>📚 Subjects</h1>

<p
  style={{
    color: "gray",
    marginBottom: "20px",
  }}
>
  Total Subjects : {subjects.length}
</p>

      <input
        type="text"
        placeholder="Enter Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

<button
  onClick={addSubject}
  style={{
    marginLeft: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
></button>

      <hr />

      {subjects.length === 0 ? (
        <h3>No Subjects Found</h3>
      ) : (
        subjects.map((subject) => (
          <div
            key={subject._id}
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
            {editingId === subject._id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
              />
            ) : (
              <h3>{subject.name}</h3>
            )}

            <div>
              {editingId === subject._id ? (
                <button onClick={updateSubject}>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(subject._id);
                    setEditName(subject.name);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteSubject(subject._id)}
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
  </>
);
}

export default Subjects;