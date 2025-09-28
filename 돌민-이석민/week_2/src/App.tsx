import { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import type { Task } from "./types";

export default function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  // 추가
  const addTodo = (text: string) => {
    setTodos((prev) => [{ id: Date.now(), text }, ...prev]);
  };

  // 완료로 이동
  const completeTask = (task: Task) => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDoneTasks((prev) => [task, ...prev]);
  };

  // 완료에서 삭제
  const deleteTask = (task: Task) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <Header />
      <Editor onAdd={addTodo} />

      <div className="render-container">
        <List
          title="할 일"
          items={todos}
          isDone={false}
          onComplete={completeTask}
          onDelete={deleteTask}
          id="todo-list"
        />

        <List
          title="완료"
          items={doneTasks}
          isDone={true}
          onComplete={completeTask}
          onDelete={deleteTask}
          id="done-list"
        />
      </div>
    </div>
  );
}
