import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TasksContext";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { addTask } = useTasks();

  return (
    <div className="app-shell">
      <Sidebar />
      <Navbar onSearch={setSearch} />
      <main className="main">
        {/* toolbar ABOVE columns */}
        <div className="toolbar">
          <button className="btn primary" onClick={() => setOpen(true)}>Add Task</button>
        </div>

        <Board search={search} />

        <TaskForm
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => addTask(data)}
        />
      </main>
    </div>
  );
}
