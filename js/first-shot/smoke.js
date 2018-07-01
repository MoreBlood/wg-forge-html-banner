/* globals createjs */
import shapes from '../shapes';
import { random } from '../utils';


class Smoke extends createjs.Container {
  constructor(timeScale = 1) {
    super();
    const smoke = new createjs.Bitmap(shapes.shots.first.smoke);

    smoke.regY = 75;
    smoke.regX = 228;
    smoke.scale = 0.1;
    smoke.alpha = 0;

    const smokeArray = Array.from(Array(10)).map(() => smoke.clone());

    for (let i = 0; i < smokeArray.length; i += 1) {
      this.addChild(smokeArray[i]);
      createjs.Tween.get(smokeArray[i], { loop: true, timeScale })
        .wait(i * 400)
        .to({ x: smoke.x - random(10, 100), y: smoke.y - random(10, 15), scale: random(1, 1.3) }, 3000);

      createjs.Tween.get(smokeArray[i], { loop: true, timeScale })
        .wait(i * 400)
        .to({ alpha: 1 }, 500)
        .to({ alpha: 0 }, 2500);
    }
  }
}


export { Smoke as default };

