import { useState } from "react";

export default function TaskForm({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("not_started");
  const [due, setDue] = useState("");

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueAt: due ? new Date(due).getTime() : undefined
    });
    // reset
    setTitle(""); setDescription(""); setPriority("low"); setStatus("not_started"); setDue("");
    onClose?.();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Add Task</h3>
        <form onSubmit={submit}>
          <div className="form-row">
            <label className="label">Title</label>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} autoFocus />
          </div>
          <div className="form-row">
            <label className="label">Description</label>
            <textarea rows="3" value={description} onChange={e=>setDescription(e.target.value)} />
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
                <option value="started">Started</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <label className="label">End date</label>
            <input className="input" type="date" value={due} onChange={e=>setDue(e.target.value)} />
          </div>

          <div style={{display:"flex", gap:8, justifyContent:"flex-end"}}>
            <button className="btn" type="button" onClick={onClose}>Cancel</button>
            <button className="btn primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
