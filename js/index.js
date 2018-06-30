/* global createjs */

import firstShot from './first-shot/shot';
import shapes from './shapes';
import Shell from './first-shot/shell';


const stage = new createjs.Stage('ad');
stage.enableMouseOver(20);
stage.addChild(firstShot);

const wotLogo = new createjs.Bitmap(shapes.shots.first.wotLogo);
wotLogo.y = 0;
wotLogo.x = 60;

stage.addChild(wotLogo);

const shell = new Shell();
shell.shellContainer.x = 290;
shell.shellContainer.y = 179;

stage.addChild(shell.shellContainer);


const enjoy = new createjs.Bitmap(shapes.shots.first.enjoy);

enjoy.y = 210;
enjoy.x = 92;

stage.addChild(enjoy);

shell.filled
  .then(() => {
    firstShot.shoot();
    createjs.Tween.get(shell.shellContainer)
      .wait(500)
      .to({ y: shell.shellContainer.y + 200 }, 1000);

    createjs.Tween.get(enjoy)
      .wait(500)
      .to({ y: enjoy.y + 200 }, 1000);
  });

//const stage2 = new createjs.Stage('ad');
//stage2.compositeOperation = 'lighter';
//stage2.autoClear = false;


createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);

setInterval(() => {
  console.log(createjs.Ticker.getMeasuredFPS())
}, 1000)
// createjs.Ticker.addEventListener('tick', stage2);
