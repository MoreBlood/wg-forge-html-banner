/* global createjs */
import shapes from '../shapes';

class Explosion extends createjs.Container {
  constructor(timeScale = 5) {
    super();
    const start = new createjs.Bitmap(shapes.shots.first.explosion.start);
    const middle = new createjs.Bitmap(shapes.shots.first.explosion.middle);
    const end = new createjs.Bitmap(shapes.shots.first.explosion.end);
    const smoke = new createjs.Bitmap(shapes.shots.first.explosion.smoke);
    const sparks = new createjs.Bitmap(shapes.shots.first.explosion.sparks);
    const trail = new createjs.Bitmap(shapes.shots.first.explosion.trail);

    trail.setTransform(-9, 15, 1, 1, -28, 0, 0, 7, 3);
    smoke.setTransform(0, 15, 0.3, 0.3, 13, 0, 0, 27, 107);
    sparks.setTransform(20, 20, 1, 1, 0, 0, 0, 165, 100);
    start.setTransform(0, 0, 0.1, 0.1, 0, 0, 0, 40, 100);
    end.setTransform(-10, 47, 0.1, 0.1, 0, 0, 0, 52, 80);
    middle.setTransform(-5, 23, 0.1, 0.1, 0, 0, 0, 36, 41);

    sparks.compositeOperation = 'screen';

    sparks.alpha = 0;
    smoke.alpha = 0;
    start.alpha = 0;
    end.alpha = 0;
    middle.alpha = 0;
    trail.alpha = 0;

    [smoke, end, middle, start, trail, sparks].forEach(elem => this.addChild(elem));

    const explosion = [end, middle, start, trail];

    for (let i = 0; i < explosion.length; i += 1) {
      explosion[i].shadow = new createjs.Shadow('#ff8600', 0, 0, 30);
    }

    this.shadow = new createjs.Shadow('#ff5600', 0, 0, 30);

    this.timeLine = new createjs.Timeline({ paused: true, timeScale });

    this.timeLine.addTween(
      createjs.Tween.get(start)
        .to({ scale: 1, alpha: 1 }, 500)
        .wait(150)
        .to({ scale: 0.8, alpha: 0 }, 500),
      createjs.Tween.get(trail)
        .to({ alpha: 1, y: -80, x: 162 }, 1000)
        .wait(150)
        .to({ scale: 0.8, alpha: 0 }, 500),
      createjs.Tween.get(smoke)
        .to({ alpha: 0.7 }, 500)
        .to({ x: smoke.x + 30, y: smoke.y - 40, scale: 1.7, alpha: 0 }, 9500),
      createjs.Tween.get(sparks)
        .to({ scale: 1, alpha: 1 }, 500)
        .wait(150)
        .to({ alpha: 0 }, 100),
      createjs.Tween.get(middle)
        .wait(150)
        .to({ scale: 1, x: 17, y: -5, alpha: 1 }, 500)
        .wait(200)
        .to({ scale: 0.8, alpha: 0 }, 500),
      createjs.Tween.get(end)
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

