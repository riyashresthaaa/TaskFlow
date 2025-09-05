import { uid } from "../utils/id";

export const seedUser = {
  id: "u1",
  name: "TaskFlow User",
  email: "demo@taskflow.app",
  password: "demo123",   
  contact: "",
  address: "",
  photoDataUrl: ""      
};

export const seedTasks = [
  { id: uid(), title: "Django client secret", description: "", status: "not_started", priority: "medium", createdAt: Date.now() },
  { id: uid(), title: "Ninja Infosys", description: "", status: "not_started", priority: "low", createdAt: Date.now() },
  { id: uid(), title: "Grievance system", description: "Pixel-perfect Carbon UI", status: "not_started", priority: "high", createdAt: Date.now() },
  { id: uid(), title: "React/Next.js", description: "", status: "started", priority: "medium", createdAt: Date.now() },
  { id: uid(), title: "Reminder", description: "Action items", status: "started", priority: "high", createdAt: Date.now() },
  { id: uid(), title: "New project", description: "", status: "finished", priority: "low", createdAt: Date.now(), finishedAt: Date.now() }
];
