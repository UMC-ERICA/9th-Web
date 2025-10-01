import React from "react";
import { useTodo } from "../context/TodoContext";

const TodoInput: React.FC = () => {
  const { input, setInput, handleAddTodo } = useTodo();

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAddTodo}>할 일 추가</button>
    </div>
  );
};

export default TodoInput;
