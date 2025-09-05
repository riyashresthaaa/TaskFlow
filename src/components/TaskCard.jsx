import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index }) {
  const navigate = useNavigate();
  const pclass =
    task.priority === "high" ? "badge high" :
    task.priority === "medium" ? "badge medium" : "badge low";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <div className="title">{task.title}</div>
          <div className="badges">
            <span className={pclass}>{task.priority}</span>
            {task.status === "started" && <span className="badge">In progress</span>}
            {task.status === "finished" && <span className="badge">Done</span>}
          </div>
        </div>
      )}
    </Draggable>
  );
}
