/* global createjs */

import { tracksContainer, tracksRotatingTimeline } from '../tracks';
import tankContainer from '../first-shot/tank';
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import Explosion from '../first-shot/explosion';
import Firework from '../first-shot/fireworks';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const shot = new createjs.Container();
const tank = new createjs.Container();

const hill = new createjs.Bitmap(shapes.shots.first.hill);
const hillLight = new createjs.Bitmap(shapes.shots.first.explosion.hillLight);
const treeLeft = new createjs.Bitmap(shapes.shots.first.treeLeft);
const treeRight = new createjs.Bitmap(shapes.shots.first.treeRight);


const firework = new Firework();
shot.addChild(firework);

const smoke0 = new Smoke(0.2).container;

smoke0.y = 170;
smoke0.x = 300;
smoke0.scaleX = 2.5;
smoke0.scaleY = 2.5;
smoke0.alpha = 1;

shot.addChild(smoke0);

shot.addChild(tank);
tank.y = 100;

const smoke = new Smoke(0.5).container;

smoke.y = 210;
smoke.x = 190;

shot.addChild(smoke);

const smoke3 = new Smoke(0.2).container;

smoke3.y = 210;
smoke3.x = 300;
smoke3.scaleX = 2;
smoke3.scaleY = 2;
smoke3.alpha = 0.5;

shot.addChild(smoke3);

const smoke2 = new Smoke(0.4).container;

smoke2.y = 210;
smoke2.x = 230;
smoke2.scaleX = -0.5;
smoke2.scaleY = 0.5;

shot.addChild(smoke2);

shot.addChild(hill);
hill.y = 140;
hill.x = -100;


shot.addChild(hillLight);
hillLight.y = 143;
hillLight.x = 4;
hillLight.alpha = 0;

shot.addChild(treeLeft);
treeLeft.y = 250;

shot.addChild(treeRight);
treeRight.y = 250;
treeRight.x = 100;

tracksContainer.skewX = 5;
tracksContainer.skewY = 4.55;
tracksContainer.scaleY = 1.05;
tracksContainer.scaleX = 0.91;
tracksContainer.x = 80;
tracksContainer.y = 66;


tank.addChild(tankContainer);
tank.addChild(tracksContainer);

const smokeFromTurbineRight = new Smoke(2).container;
smokeFromTurbineRight.y = 35;
smokeFromTurbineRight.x = 55;
smokeFromTurbineRight.rotation = -55;
smokeFromTurbineRight.scale = 0.6;

tankContainer.addChild(smokeFromTurbineRight);

const smokeFromTurbineLeft = new Smoke(3).container;
smokeFromTurbineLeft.y = 35;
smokeFromTurbineLeft.x = 37;
smokeFromTurbineLeft.rotation = -55;
smokeFromTurbineLeft.scale = 0.4;

tankContainer.addChild(smokeFromTurbineLeft);

const explosion = new Explosion();
explosion.container.x = 255;
explosion.container.y = 105;
shot.addChild(explosion.container);


const timeline = new createjs.Timeline({ loop: true, bounce: true });

const tankTween = createjs.Tween.get(tank).to({ x: tank.x + 30, y: tank.y + 6, scale: 0.96 }, 1000, createjs.Ease.quadInOut);

timeline.addTween(tankTween, ...tracksRotatingTimeline.tweens);

const expodeFireworks = (number) => {
  for (let i = 0; i < number; i += 1) {
    setTimeout(() => firework.shoot(
      getRandomArbitrary(200, 250),
      getRandomArbitrary(0, 40),
      getRandomArbitrary(250, 400),
      getRandomArbitrary(-10, -60),
      getRandomArbitrary(180, 360)),
    100 + (i * 500) + getRandomArbitrary(0, 250));
  }
};

shot.shoot = () => {
  timeline.paused = true;

  explosion.shoot();
  createjs.Tween.get(hillLight)
    .to({ alpha: 1 }, 100)
    .to({ alpha: 0 }, 100);
  tankContainer.blink();


  createjs.Tween.get(tank)
    .to({ x: tank.x -= 1, y: tank.y += 1 }, 100)
    .to({ x: tank.x += 1, y: tank.y -= 1 }, 100);

  createjs.Tween.get(shot)
    .to({ x: shot.x -= 5, y: shot.y += 10 }, 100)
    .to({ x: shot.x += 5, y: shot.y -= 10 }, 200)
    .wait(500)
    .to({ x: shot.x - 170, y: shot.y + 100 }, 2000, createjs.Ease.quadInOut)
    .call(() => expodeFireworks(10))
    .wait(1500)
    .call(() => expodeFireworks(7))
    .wait(3500)
    .call(() => expodeFireworks(5));
};

export { shot as default };
