import React from "react";
import { useTodo } from "../context/TodoContext";

interface TodoListProps {
  type: "todo" | "completed";
  title: string;
  emptyMessage: string;
}

const TodoList: React.FC<TodoListProps> = ({ type, title, emptyMessage }) => {
  const { todos, completed, handleComplete, handleDelete } = useTodo();
  const list = type === "todo" ? todos : completed;

  return (
    <div>
      <h4>{title}</h4>
      {list.length === 0 ? <p>{emptyMessage}</p> : (
        <ul>
          {list.map((todo, idx) => (
            <li key={idx}>
              {todo}
              {type === "todo" && <button onClick={() => handleComplete(todo)}>완료</button>}
              {type === "completed" && <button onClick={() => handleDelete(todo)}>삭제</button>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
  