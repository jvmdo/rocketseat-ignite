import style from "./Header.module.css";
import logoPath from "./../assets/ignite-logo.svg";

export function Header() {
  return (
    <header className={style.header}>
      <img src={logoPath} alt="Ignite logo" />
      <h1>Ignite Feed</h1>
    </header>
  );
}
