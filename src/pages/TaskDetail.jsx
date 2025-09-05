import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useState } from "react";

export default function TaskDetail() {
  const { id } = useParams();
  const { getTaskById, updateTask, deleteTask } = useTasks();
  const t = getTaskById(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(t?.title || "");
  const [description, setDescription] = useState(t?.description || "");
  const [priority, setPriority] = useState(t?.priority || "low");
  const [status, setStatus] = useState(t?.status || "not_started");

  if (!t) {
    return <div className="detail"><b>Task not found.</b></div>;
  }

  function save(e) {
    e.preventDefault();
    updateTask(t.id, { title, description, priority, status });
    navigate("/");
  }

  return (
    <div className="app-shell">
      <div style={{gridArea:"sidebar"}}></div>
      <div style={{gridArea:"navbar"}} className="navbar">
        <strong>Task Detail</strong>
      </div>
      <main className="main">
        <div className="detail">
          <h2 style={{marginTop:0}}>{t.title}</h2>
          <form onSubmit={save}>
            <div className="form-row">
              <label className="label">Title</label>
              <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label">Description</label>
              <textarea rows="4" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <div className="form-row" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
              <div>
                <label className="label">Priority</label>
                <select value={priority} onChange={e=>setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select value={status} onChange={e=>setStatus(e.target.value)}>
                  <option value="not_started">Not started</option>
                  <option value="started">In progress</option>
                  <option value="finished">Done</option>
                </select>
              </div>
            </div>

            <div style={{display:"flex", gap:8, marginTop:12}}>
              <button className="btn primary" type="submit">Save</button>
              <button className="btn" type="button" onClick={()=>navigate(-1)}>Back</button>
              <button className="btn" style={{borderColor:"var(--danger)", color:"var(--danger)"}}
                      type="button" onClick={() => { deleteTask(t.id); navigate("/"); }}>
                Delete
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
