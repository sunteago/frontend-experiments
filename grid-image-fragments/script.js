const gridContainer = document.querySelector(".grid");
const COLS = 2;
const ROWS = 2;
const CELLS = COLS * ROWS;

gridContainer.style.display = "grid";
gridContainer.style["grid-template-columns"] = `repeat(${ROWS}, 1fr)`;

Array.from({ length: CELLS }, (_, i) => i).forEach(() => {
  const el = document.createElement("div");
  gridContainer.append(el);
});
