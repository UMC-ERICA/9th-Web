import type { Task } from "../App";

type Props = {
  task: Task;
  onComplete?: () => void;
  onDelete?: () => void;
};

export function TodoItem({ task, onComplete, onDelete }: Props) {
  const isDone = task.done;

  return (
    <li
      className={`flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 
                  dark:border-neutral-700 bg-gray-50 dark:bg-neutral-700 transition-colors`}
    >
      <span
        className={`flex-1 truncate text-sm ${
          isDone ? "line-through text-gray-500" : "text-neutral-800 dark:text-neutral-100"
        }`}
      >
        {task.text}
      </span>

      {isDone ? (
        <button
          onClick={onDelete}
          className="ml-3 px-2 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          삭제
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="ml-3 px-2 py-1 text-xs rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          완료
        </button>
      )}
    </li>
  );
}
