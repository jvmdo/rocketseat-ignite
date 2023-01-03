import style from "./Sidebar.module.css";
import { PencilLine } from "phosphor-react";
import { Avatar } from "./Avatar";

export function Sidebar() {
  return (
    <aside className={style.sidebar}>
      <img
        className={style.cover}
        src="https://images.unsplash.com/photo-1517134062979-e1234be8a085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=440&q=50"
        alt=""
      />
      <Avatar src="https://github.com/jvmdo.png" isFloat={true} />
      <strong>João Oliveira</strong>
      <span>Web Developer</span>
      <a href="#">
        <PencilLine size={20} /> Edit profile
      </a>
    </aside>
  );
}
