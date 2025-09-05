import { useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../context/TasksContext";
import Column from "./Column";

export default function Board({ search }) {
  const { tasks, counts, changeStatus } = useTasks();

  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase();
    return q ? tasks.filter(t => t.title.toLowerCase().includes(q)) : tasks;
  }, [tasks, search]);

  const by = (s) => filtered.filter(t => t.status === s);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const from = source.droppableId;
    const to = destination.droppableId;
    if (from === to) return; 
    changeStatus(draggableId, to);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <Column droppableId="not_started" title="Not started" count={counts.not_started} tasks={by("not_started")} />
        <Column droppableId="started"     title="In progress" count={counts.started}     tasks={by("started")} />
        <Column droppableId="finished"    title="Done"        count={counts.finished}    tasks={by("finished")} />
      </div>
    </DragDropContext>
  );
}
