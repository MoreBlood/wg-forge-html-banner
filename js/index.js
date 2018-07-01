/* global createjs */

import MainShot from './first-shot/shot';
import shapes from './shapes';
import Shell from './first-shot/shell';


const stage = new createjs.Stage('ad');
stage.enableMouseOver(20);

const mainShot = new MainShot();
stage.addChild(mainShot);

const wotLogo = new createjs.Bitmap(shapes.shots.first.wotLogo);
wotLogo.y = 0;
wotLogo.x = 60;

stage.addChild(wotLogo);

const shell = new Shell();
shell.x = 290;
shell.y = 179;

stage.addChild(shell);


const enjoy = new createjs.Bitmap(shapes.shots.first.enjoy);

enjoy.y = 210;
enjoy.x = 92;

stage.addChild(enjoy);

shell.filled
  .then(() => {
    mainShot.shoot();
    createjs.Tween.get(shell)
      .wait(500)
      .to({ y: shell.y + 200 }, 1000);

    createjs.Tween.get(enjoy)
      .wait(500)
      .to({ y: enjoy.y + 200 }, 1000);
  });

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);

setInterval(() => {
  console.log(createjs.Ticker.getMeasuredFPS(1));
}, 1000);
