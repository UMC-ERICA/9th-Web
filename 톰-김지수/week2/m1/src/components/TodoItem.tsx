import type { Task } from "../App";

type Props = {
  task: Task;
  onComplete?: () => void;
  onDelete?: () => void;
};

export function TodoItem({ task, onComplete, onDelete }: Props) {
  const isDone = task.done;

  return (
    <li className="render-container__item">
      <span>{task.text}</span>
      {isDone ? (
        <button
          className="render-container__item-button"
          style={{ backgroundColor: "#dc3545" }}
          onClick={onDelete}
        >
          삭제
        </button>
      ) : (
        <button
          className="render-container__item-button"
          style={{ backgroundColor: "#28a745" }}
          onClick={onComplete}
        >
          완료
        </button>
      )}
    </li>
  );
}
