import style from "./Main.module.css";
import notepad from "../assets/notepad.svg";
import { PlusCircle } from "phosphor-react";
import { Task } from "./Task";
import { data } from "../data/tasks";
import { ChangeEvent, FormEvent, useState } from "react";

export interface TaskProps {
  id: string;
  text: string;
  isDone: boolean;
  // toggleDone(): void;
  toggleDone?: (id: string) => void;
  deleteTask?: (id: string) => void;
}

export function Main() {
  const [tasks, setTasks] = useState(data);

  const createdTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isDone).length;

  function onCreateTask(newTask: TaskProps): void {
    setTasks((state) => [newTask, ...state]);
  }

  function onToggleTask(taskId: string) {
    const newTasksState = tasks.map((task) => {
      if (task.id === taskId) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTasks(newTasksState);
  }

  function onDeleteTask(taskId: string) {
    const newTasksState = tasks.filter((task) => task.id != taskId);
    setTasks(newTasksState);
  }

  return (
    <main>
      <div className="container">
        {CreateTaskForm(onCreateTask)}
        {TasksProgress(createdTasks, completedTasks)}
        {createdTasks
          ? TasksList(tasks, onToggleTask, onDeleteTask)
          : EmptyTasksPlaceholder()}
      </div>
    </main>
  );
}

function CreateTaskForm(onNewTask: (newTask: TaskProps) => void) {
  const [newText, setNewText] = useState("");

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newText) return;
    onNewTask({ id: `${crypto.randomUUID()}`, text: newText, isDone: false });
    setNewText("");
  }

  function handleTextInput(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    if (!text.trim()) {
      setNewText("");
      return;
    }
    setNewText(text);
  }

  return (
    <form method="post" className={style.createForm} onSubmit={createTask}>
      <input
        type="text"
        name="taskText"
        placeholder="Add a new task"
        className={style.createInput}
        onChange={handleTextInput}
        value={newText}
      />
      <button className={style.createButton}>
        Create
        <PlusCircle size="16" weight="bold" color="var(--gray-100)" />
      </button>
    </form>
  );
}

function TasksProgress(createdTasks: number, completedTasks: number) {
  return (
    <div className={style.tasksInfo}>
      <p>
        Created tasks <span className={style.tasksCounter}>{createdTasks}</span>
      </p>
      <p>
        Completed{" "}
        <span className={style.tasksCounter}>
          {completedTasks}/{createdTasks}
        </span>
      </p>
    </div>
  );
}

function EmptyTasksPlaceholder() {
  return (
    <div className={style.placeholder}>
      <img src={notepad} alt="" />
      <p>
        <strong>You have no registered tasks yet</strong>
      </p>
      <p>Create tasks and organize your todo items</p>
    </div>
  );
}

function TasksList(
  tasks: TaskProps[],
  onToggleTask: (taskId: string) => void,
  onDeleteTask: (taskId: string) => void
) {
  return (
    <form className="tasksForm">
      <fieldset>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            isDone={task.isDone}
            toggleDone={onToggleTask}
            deleteTask={onDeleteTask}
          />
        ))}
      </fieldset>
    </form>
  );
}
