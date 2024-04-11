import * as PIXI from "pixi.js";
import * as REVOLT from "revolt-fx";


let app = new PIXI.Application<HTMLCanvasElement>({
  width: 1920,
  height: 1080,
  background: 0x000000
});
document.getElementById("app").appendChild(app.view);

const fx = new REVOLT.FX();

PIXI.Assets.add({ alias: 'fx_settings', src: 'assets/1.json' });
PIXI.Assets.add({ alias: 'fx_spritesheet', src: 'assets/spritesheet.json' });

PIXI.Assets.load(['fx_settings', 'fx_spritesheet']).then(function (data) {
  //Init the bundle
  fx.initBundle(data.fx_settings);
  const emitter = fx.getParticleEmitter('all');

  //Inititialize it with the target PIXI container
  emitter.init(app.stage);
  emitter.start();
  emitter.x = 960;
  emitter.y - 540;
  app.ticker.add(function () {
    //Update the RevoltFX instance
    fx.update();
  });
});
