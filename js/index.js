import firstShot from './first-shot/shot';

const createjs = window.createjs;
const stage = new createjs.Stage('ad');
stage.enableMouseOver(20);
stage.addChild(firstShot);

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', stage);
