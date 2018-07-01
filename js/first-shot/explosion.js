/* global createjs */
import shapes from '../shapes';

class Explosion extends createjs.Container {
  constructor(timeScale = 1) {
    super();
    const start = new createjs.Bitmap(shapes.shots.first.explosion.start);
    const middle = new createjs.Bitmap(shapes.shots.first.explosion.middle);
    const end = new createjs.Bitmap(shapes.shots.first.explosion.end);
    const sparks = new createjs.Bitmap(shapes.shots.first.explosion.sparks);

    sparks.x = 20;
    sparks.regX = 165;
    sparks.regY = 100;
    sparks.y = 20;
    sparks.alpha = 0;
    sparks.compositeOperation = 'screen';

    start.regX = 40;
    start.regY = 100;
    start.scale = 0.1;
    start.alpha = 0;

    end.regX = 52;
    end.regY = 80;
    end.y = -10;
    end.x = 47;
    end.scale = 0.1;
    end.alpha = 0;

    middle.regX = 36;
    middle.regY = 41;
    middle.y = -5;
    middle.x = 23;
    middle.scale = 0.1;
    middle.alpha = 0;


    this.addChild(end);
    this.addChild(middle);
    this.addChild(start);
    this.addChild(sparks);

    this.timeLine = new createjs.Timeline({ paused: true, timeScale: 5 });
    this.timeLine.addTween(
      createjs.Tween.get(start, { timeScale })
        .to({ scale: 1, alpha: 1 }, 500)
        .wait(150)
        .to({ scale: 0.8, alpha: 0 }, 500),

      createjs.Tween.get(sparks, { timeScale })
        .to({ scale: 1, alpha: 1 }, 500)
        .wait(150)
        .to({ alpha: 0 }, 100),

      createjs.Tween.get(middle, { timeScale })
        .wait(150)
        .to({ scale: 1, x: 17, y: -5, alpha: 1 }, 500)
        .wait(200)
        .to({ scale: 0.8, alpha: 0 }, 500),

      createjs.Tween.get(end, { timeScale })
        .wait(150)
        .to({ scale: 1, y: -15, x: 55, alpha: 1 }, 500)
        .wait(250)
        .to({ scale: 0.8, alpha: 0 }, 500)
        .wait(1550));
  }

  shoot() {
    this.timeLine.paused = false;
    this.timeLine.gotoAndPlay(0);
  }
}

export { Explosion as default };

