import Todo from "./Todo";
import type { Task } from "../types";

type ListProps = {
  title: string;
  items: Task[];
  isDone: boolean;
  onComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
  id?: string; // "todo-list" | "done-list" 같은 id 넘겨 사용 가능
};

export default function List({
  title,
  items,
  isDone,
  onComplete,
  onDelete,
  id,
}: ListProps) {
  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id={id} className="render-container__list">
        {items.map((task) => (
          <Todo
            key={task.id}
            task={task}
            isDone={isDone}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
