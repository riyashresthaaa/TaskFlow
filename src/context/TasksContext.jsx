import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { seedTasks } from "../data/seed";
import { uid } from "../utils/id";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("taskflow_tasks", seedTasks);

  const counts = useMemo(() => ({
    not_started: tasks.filter(t => t.status === "not_started").length,
    started: tasks.filter(t => t.status === "started").length,
    finished: tasks.filter(t => t.status === "finished").length
  }), [tasks]);

  function addTask(partial) {
    const t = { id: uid(), title: "", description: "", status: "not_started", priority: "low", createdAt: Date.now(), ...partial };
    setTasks(prev => [t, ...prev]);
    return t.id;
  }

  function updateTask(id, updates) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, finishedAt: updates.status === "finished" ? Date.now() : t.finishedAt } : t));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function getTaskById(id) {
    return tasks.find(t => t.id === id);
  }

  function changeStatus(id, status) {
    updateTask(id, { status, finishedAt: status === "finished" ? Date.now() : undefined });
  }

  function clearFinished() {
    setTasks(prev => prev.filter(t => t.status !== "finished"));
  }

  return (
    <TasksContext.Provider value={{ tasks, counts, addTask, updateTask, deleteTask, getTaskById, changeStatus, clearFinished }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
