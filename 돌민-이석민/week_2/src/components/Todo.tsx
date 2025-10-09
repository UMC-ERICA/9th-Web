import { memo } from "react";
import type { Task } from "../types";

type TodoProps = {
  task: Task;
  isDone: boolean;
  onComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
};

function TodoBase({ task, isDone, onComplete, onDelete }: TodoProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text" title={task.text}>
        {task.text}
      </span>

      <button
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? "#dc3545" : "#28a745" }}
        onClick={() => (isDone ? onDelete(task) : onComplete(task))}
        aria-label={isDone ? "삭제" : "완료"}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
}

const Todo = memo(TodoBase);
export default Todo;
