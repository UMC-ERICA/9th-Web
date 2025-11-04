import { useState } from 'react';
import type { FormEvent } from 'react';
import { TodoItem } from './components/TodoItem';
import './App.css';

export type Task = { id: number; text: string; done: boolean };

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTasks(prev => [...prev, { id: Date.now(), text: t, done: false }]);
    setText('');
  };

  const completeTask = (id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: true } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const todoList = tasks.filter(t => !t.done);
  const doneList = tasks.filter(t => t.done);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form id="todo-form" className="todo-container__form" onSubmit={addTodo}>
        <input
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todoList.map(t => (
              <TodoItem
                key={t.id}
                task={t}
                onComplete={() => completeTask(t.id)}
              />
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneList.map(t => (
              <TodoItem key={t.id} task={t} onDelete={() => deleteTask(t.id)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
