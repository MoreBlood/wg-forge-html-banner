import { tracksContainer, tracksRotatingTimeline } from '../tracks';
import tankContainer from '../first-shot/tank';
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import shell from '../first-shot/shell';

const createjs = window.createjs;

const shot = new createjs.Container();
const tank = new createjs.Container();

const background = new createjs.Bitmap(shapes.shots.first.backgroud);
const hill = new createjs.Bitmap(shapes.shots.first.hill);
const treeLeft = new createjs.Bitmap(shapes.shots.first.treeLeft);
const treeRight = new createjs.Bitmap(shapes.shots.first.treeRight);
const enjoy = new createjs.Bitmap(shapes.shots.first.enjoy);
const wotLogo = new createjs.Bitmap(shapes.shots.first.wotLogo);

background.x = -120;
background.y = -120;
shot.addChild(background);

const smoke0 = new Smoke(0.2).container;

smoke0.y = 250;
smoke0.x = 200;
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

shot.addChild(treeLeft);
treeLeft.y = 250;

shot.addChild(treeRight);
treeRight.y = 250;
treeRight.x = 100;

shell.x = 290;
shell.y = 179;

shot.addChild(shell);

enjoy.y = 210;
enjoy.x = 92;

shot.addChild(enjoy);

wotLogo.y = 0;
wotLogo.x = 60;

shot.addChild(wotLogo);

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


const timeline = new createjs.Timeline({ loop: true, bounce: true });

const tankTween = createjs.Tween.get(tank).to({ x: tank.x + 30, y: tank.y + 6, scale: 0.96 }, 1000, createjs.Ease.quadInOut);

timeline.addTween(tankTween, ...tracksRotatingTimeline.tweens);

createjs.Tween.get(shot).to({ x: shot.x - 150, y: shot.y + 60 }, 1000, createjs.Ease.quadInOut);

export { shot as default };
