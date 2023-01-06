import logo from "../assets/logo.svg";

export function Header() {
  const style = {
    backgroundColor: "var(--gray-700)",
    display: "grid",
    placeItems: "center",
    height: "25vh",
  };

  return (
    <header style={style}>
      <div className="container">
        <img src={logo} alt="Todo logo" />
      </div>
    </header>
  );
}
