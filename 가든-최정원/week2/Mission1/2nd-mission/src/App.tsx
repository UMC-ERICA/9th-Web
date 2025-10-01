import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import "./App.css";   


function App() {
  return (
    <TodoProvider>
      <div className="todo-box">
        <h3>Garden TodoList</h3>
        <TodoInput />
        <div className="lists-container">
          <TodoList type="todo" title="할 일" emptyMessage="할 일이 없습니다." />
          <TodoList type="completed" title="완료" emptyMessage="완료된 항목이 없습니다." />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;