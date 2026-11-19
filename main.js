// startar pixi
const app = new PIXI.Application();
// fyller fönstret, mörk bakgrund
await app.init({ resizeTo: window, background: "#0a0a12" });
// lägger canvas på sidan
document.body.appendChild(app.canvas);

// ritar prickarna
const dots = new PIXI.Graphics();
app.stage.addChild(dots);

// sparar musens position
const mouse = { x: 0, y: 0 };
// uppdaterar när musen rör sig
window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// tid för puls
let time = 0;

// körs varje frame
app.ticker.add((ticker) => {
  // tiden går framåt
  time += ticker.deltaTime * 0.05;
  // rensar förra bilden
  dots.clear();
  // rutnät, 30px mellan
  for (let x = 0; x < app.screen.width; x += 30) {
    for (let y = 0; y < app.screen.height; y += 30) {
      // avstånd till musen
      const distance = Math.hypot(x - mouse.x, y - mouse.y);
      // vågig puls
      const pulse = Math.sin(time + x * 0.02 + y * 0.02) * 1.5;
      // större prick nära musen
      dots.circle(x, y, Math.max(1, 8 - distance / 30 + pulse));
      // turkos nära, rosa långt bort
      dots.fill(distance < 150 ? "#00f0ff" : "#ff2bd6");
    }
  }
});

// hämtar popup
const popup = document.querySelector(".popup");
const popupImg = document.querySelector(".popup img");

// klick på bild öppnar
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    popupImg.src = img.src;
    popup.classList.add("open");
  });
});

// klick stänger
popup.addEventListener("click", () => {
  popup.classList.remove("open");
});