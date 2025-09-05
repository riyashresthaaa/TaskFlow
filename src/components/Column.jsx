import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ droppableId, title, count, tasks }) {
  return (
    <div className="column">
      <div className="col-head">
        <div className="col-title">
          <span>{title}</span>
          <span className="count">{count}</span>
        </div>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 40 }}>
            {tasks.map((t, idx) => (
              <TaskCard key={t.id} task={t} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
