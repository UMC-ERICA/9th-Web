import { useState } from "react";
import type { FormEvent } from "react";
import { TodoItem } from "./components/TodoItem";
import ThemeToggle from "./components/ThemeToggle";

export type Task = { id: number; text: string; done: boolean };

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setText("");
  };

  const completeTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: true } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const todoList = tasks.filter((t) => !t.done);
  const doneList = tasks.filter((t) => t.done);

  return (
    <div className="flex items-center justify-center min-h-svh bg-[#eef2f3] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg w-[360px] text-center p-6 transition-colors">
        {/* ===== 제목 헤더 ===== */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">YONG TODO</h1>
          <ThemeToggle />
        </div>

        {/* ===== 입력 폼 ===== */}
        <form onSubmit={addTodo} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="할 일 입력"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md 
                       text-sm outline-none transition-colors
                       focus:border-green-500 dark:focus:border-green-400
                       bg-white dark:bg-neutral-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium
                       hover:bg-green-700 transition-colors"
          >
            할 일 추가
          </button>
        </form>

        {/* ===== 리스트 컨테이너 ===== */}
        <div className="flex justify-between gap-5 text-left">
          {/* ===== 할 일 ===== */}
          <section className="w-full">
            <h2 className="text-lg font-semibold mb-3 text-center text-neutral-700 dark:text-neutral-300">
              할 일
            </h2>
            <ul className="space-y-2">
              {todoList.map((t) => (
                <TodoItem key={t.id} task={t} onComplete={() => completeTask(t.id)} />
              ))}
            </ul>
          </section>

          {/* ===== 완료 ===== */}
          <section className="w-full">
            <h2 className="text-lg font-semibold mb-3 text-center text-neutral-700 dark:text-neutral-300">
              완료
            </h2>
            <ul className="space-y-2">
              {doneList.map((t) => (
                <TodoItem key={t.id} task={t} onDelete={() => deleteTask(t.id)} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
