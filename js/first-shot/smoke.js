import shapes from '../shapes';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const createjs = window.createjs;

class Smoke {
  constructor(timeScale = 1) {
    const smoke = new createjs.Bitmap(shapes.shots.first.smoke);
    this.container = new createjs.Container();

    smoke.regY = 75;
    smoke.regX = 228;
    smoke.scale = 0.1;
    smoke.alpha = 0;

    const smokeArray = Array.from(Array(10)).map(() => smoke.clone());

    for (let i = 0; i < smokeArray.length; i += 1) {
      this.container.addChild(smokeArray[i]);
      createjs.Tween.get(smokeArray[i], { loop: true, timeScale })
        .wait(i * 400)
        .to({ x: smoke.x - getRandomArbitrary(10, 100), y: smoke.y - getRandomArbitrary(10, 15), scale: getRandomArbitrary(1, 1.3) }, 3000);

      createjs.Tween.get(smokeArray[i], { loop: true, timeScale })
        .wait(i * 400)
        .to({ alpha: 1 }, 500)
        .to({ alpha: 0 }, 2500);
    }
  }
}


export { Smoke as default };

