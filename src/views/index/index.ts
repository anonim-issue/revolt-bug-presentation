import * as PIXI from "pixi.js";
import * as REVOLT from "revolt-fx";
import "./index.scss";

let app = new PIXI.Application<HTMLCanvasElement>({
  width: 1920,
  height: 1080,
  background: 0x000000
});
app.ticker.maxFPS = 30;
document.getElementById("app").appendChild(app.view);

const fx = new REVOLT.FX();

PIXI.Assets.add({ alias: 'fx_settings', src: 'assets/1.json' });
PIXI.Assets.add({ alias: 'fx_spritesheet', src: 'assets/spritesheet.json' });

PIXI.Assets.load(['fx_settings', 'fx_spritesheet']).then(function (data) {
  //Init the bundle
  fx.initBundle(data.fx_settings);
  const emitter = fx.getParticleEmitter('all');

  //Inititialize it with the target PIXI container
  emitter.init(new PIXI.Container());
  emitter.start();
  emitter.container.x = 960;
  emitter.container.y = 260;
  emitter.container.setParent(app.stage);
  app.ticker.add(function (delta) {
    //Update the RevoltFX instance
    fx.update(delta);
  });
});

function resize() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  let ratio = Math.min(scaleX, scaleY);
  let dx = window.innerWidth - ratio * 1920;
  let dy = window.innerHeight - ratio * 1080;

  app.view.setAttribute("style", `
    width: ${ratio * 1920}px;
    height: ${ratio * 1080}px;
    left: ${dx > 0 ? ~~(dx / 2) : 0}px;
    top:  ${dy > 0 ? ~~(dy / 2) : 0}px;
  `);
}
resize();
window.addEventListener("resize", () => resize());
