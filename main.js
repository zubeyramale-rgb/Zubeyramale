// startar pixi
const app = new PIXI.Application();
// fyller fönstret, vit bakgrund
await app.init({ resizeTo: window, background: "#ffffff" });
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

// körs varje frame
app.ticker.add(() => {
  // rensar förra bilden
  dots.clear();
  // rutnät, 30px mellan
  for (let x = 0; x < app.screen.width; x += 30) {
    for (let y = 0; y < app.screen.height; y += 30) {
      // avstånd till musen
      const distance = Math.hypot(x - mouse.x, y - mouse.y);
      // större prick nära musen
      dots.circle(x, y, Math.max(1, 8 - distance / 30));
    }
  }
  // blå färg
  dots.fill("#2b44d6");
});
