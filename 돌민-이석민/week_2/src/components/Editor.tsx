import { useRef } from "react";
import type { FormEvent } from "react";

type EditorProps = {
  onAdd: (text: string) => void;
};

export default function Editor({ onAdd }: EditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value ?? "";
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={onSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        ref={inputRef}
        required
        aria-label="할 일 입력"
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}
