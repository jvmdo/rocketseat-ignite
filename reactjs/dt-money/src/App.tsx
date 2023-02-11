import { useEffect } from "react";
import "./App.css";

export function App() {
  useEffect(() => {
    function setCellAlignment(cell: HTMLElement, container: HTMLElement, threshold = rowLeftPadding) {
      const cellRelativeOffset = cell.offsetLeft - container.offsetLeft
      if (cellRelativeOffset <= threshold) {
        cells.forEach((cell) => cell.style.textAlign = "start");
      } else {
        cells.forEach((cell) => cell.style.textAlign = "end");
      }
    }
  
    const row = document.querySelector(".row") as HTMLElement;
    const cells = document.querySelectorAll(".row-value") as NodeListOf<HTMLElement>;
    const rowLeftPadding = Number(window.getComputedStyle(row).getPropertyValue("padding-left").slice(0,2));
    const resizeObserver = new ResizeObserver(() => {
      setCellAlignment(cells[0], row);
    });
    
    resizeObserver.observe(row);
    // setCellAlignment(cells[0], row);
  }, [])

  return (
    <div className="table">
      <div className="row">
        <div className="subrow subrow__first">
          <span className="row-title">Desenvolvimento front-end a</span>
          <span className="row-value">R$ 777,00</span>
        </div>
        <div className="subrow subrow__last">
          <span className="row-tag">Venda</span>
          <span className="row-date">13/04/2022</span>
        </div>
      </div>
      <div className="row">
        <div className="subrow subrow__first">
          <span className="row-title">Almoço</span>
          <span className="row-value">- R$ 24,50</span>
        </div>
        <div className="subrow subrow__last">
          <span className="row-tag">Alimentação</span>
          <span className="row-date">13/04/2022</span>
        </div>
      </div>
      <div className="row">
        <div className="subrow subrow__first">
          <span className="row-title">Salário</span>
          <span className="row-value">R$ 6.000,00</span>
        </div>
        <div className="subrow subrow__last">
          <span className="row-tag">Salário</span>
          <span className="row-date">13/04/2022</span>
        </div>
      </div>
      <div className="row">
        <div className="subrow subrow__first">
          <span className="row-title">
            Aluguel do apartamento da casa do carvalho
          </span>
          <span className="row-value">- R$ 1.200,00</span>
        </div>
        <div className="subrow subrow__last">
          <span className="row-tag">Alimentação</span>
          <span className="row-date">13/04/2022</span>
        </div>
      </div>
  </div>)
}
