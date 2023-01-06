import { Trash } from "phosphor-react";
import style from "./Task.module.css";
import { TaskProps } from "./Main";
import { ChangeEvent } from "react";

export function Task({ id, text, isDone, toggleDone, deleteTask }: TaskProps) {
  function handleDoneChange(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.checked = !isDone;
    toggleDone!(id);
  }

  function handleDeleteTask() {
    deleteTask!(id);
  }

  return (
    <div className={isDone ? style.taskDone : style.task}>
      <input
        type="checkbox"
        id={id}
        className={style.checkbox}
        onChange={handleDoneChange}
        checked={isDone}
      />
      <label htmlFor={id}>{text}</label>
      <Trash
        size={20}
        weight="bold"
        className={style.deleteBtn}
        onClick={handleDeleteTask}
      />
    </div>
  );
}
