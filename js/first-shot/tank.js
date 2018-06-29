import shapes from '../shapes';

const createjs = window.createjs;

const tankContainer = new createjs.Container();
const tank = new createjs.Bitmap(shapes.shots.first.tank);

tankContainer.addChild(tank);

export { tankContainer as default };
