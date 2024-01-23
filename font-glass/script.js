const glass = document.getElementById("glass");
const title = document.getElementById("title");
const cursor = document.getElementById("cursor");

const DELAY_TIME = 50;
const GROW_RATIO = 1.8;
const MIN_GLASS_SIZE = 50;
const MAX_GLASS_SIZE = 70;

const init = () => {
  glass.style.width = `${MIN_GLASS_SIZE}px`;
  glass.style.height = `${MIN_GLASS_SIZE}px`;
};

function throttle(func, delay) {
  let lastCalled = 0;

  return function (...args) {
    const currentTime = new Date().getTime();

    if (currentTime - lastCalled >= delay) {
      lastCalled = currentTime;
      func.apply(this, args);
    }
  };
}

const onMouseMove = throttle((x, y) => {
  glass.style.top = x;
  glass.style.left = y;
}, DELAY_TIME);

const onMouseMoveCursor = throttle((x, y) => {
  cursor.style.top = x;
  cursor.style.left = y;
}, 5);

let isHovering = false;
let hoverIntervalId;
let leaveIntervalId;

// check bug that makes cursor not moving
document.addEventListener("mousemove", (event) => {
  const x = event.clientY + "px";
  const y = event.clientX + "px";
  onMouseMove(x, y);
  //   onMouseMoveCursor(x, y);
});

title.addEventListener("mouseover", (event) => {
  clearInterval(leaveIntervalId);

  hoverIntervalId = setInterval(() => {
    const glassStyle = window.getComputedStyle(glass);
    const prevWidth = Number(glassStyle.height.slice(0, -2));
    const prevHeight = Number(glassStyle.height.slice(0, -2));

    glass.style.width = Math.min(prevWidth * GROW_RATIO, MAX_GLASS_SIZE) + "px";
    glass.style.height =
      Math.min(prevHeight * GROW_RATIO, MAX_GLASS_SIZE) + "px";
  }, DELAY_TIME);
});

title.addEventListener("mouseleave", (event) => {
  clearInterval(hoverIntervalId);

  leaveIntervalId = setInterval(() => {
    const glassStyle = window.getComputedStyle(glass);
    const prevWidth = Number(glassStyle.height.slice(0, -2));
    const prevHeight = Number(glassStyle.height.slice(0, -2));

    glass.style.width = Math.max(prevWidth / GROW_RATIO, MIN_GLASS_SIZE) + "px";
    glass.style.height =
      Math.max(prevHeight / GROW_RATIO, MIN_GLASS_SIZE) + "px";
  }, DELAY_TIME);
});

init();
