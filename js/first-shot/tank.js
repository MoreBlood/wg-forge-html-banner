import shapes from '../shapes';

import createjs from 'createjs';

const tankContainer = new createjs.Container();
const tank = new createjs.Bitmap(shapes.shots.first.tank);
const tankLight = new createjs.Bitmap(shapes.shots.first.tankLight);

tankLight.x = 10;
tankLight.alpha = 0;

tankContainer.addChild(tank);
tankContainer.addChild(tankLight);
tankContainer.blink = () => {
  createjs.Tween.get(tankLight)
    .to({ alpha: 1 }, 100)
    .to({ alpha: 0 }, 100);
};

export { tankContainer as default };
