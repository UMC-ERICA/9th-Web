import React, { createContext, useContext, useState } from "react";

interface TodoContextType {
  todos: string[];
  completed: string[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: () => void;
  handleComplete: (todo: string) => void;
  handleDelete: (todo: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (input.trim() === "") return;
    setTodos((prev) => [...prev, input]);
    setInput("");
  };

  const handleComplete = (todo: string) => {
    setTodos((prev) => prev.filter((t) => t !== todo));
    setCompleted((prev) => [...prev, todo]);
  };

  const handleDelete = (todo: string) => {
    setCompleted((prev) => prev.filter((t) => t !== todo));
  };

  return (
    <TodoContext.Provider
      value={{ todos, completed, input, setInput, handleAddTodo, handleComplete, handleDelete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within a TodoProvider");
  return context;
};
